import { apiFetchInstance } from "./lib/fetch-instance"
import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
    const api = apiFetchInstance();
    console.log("Current timestamp", new Date().getTime());
    console.log("Current url", context.url.pathname);
    if (context.url.pathname == "/logout") {
        console.log("Logging out...");
        context.cookies.delete("token", { path: "/" });
        try {
            await api.post("/logout");
        } catch (error) {

        }
        return context.redirect("/", 302);
    }
    try {
        const token = context.cookies.get("token")?.value;
        if (!token) throw new Error("No token");
        if (token) {
            api.defaultHeaders["Authorization"] = `Bearer ${token}`;
            context.locals.token = `Bearer ${token}`;

        } else throw new Error("No token");

    } catch (error: any) {
        if (!context.url.pathname.startsWith("/login")
            && context.url.pathname != "/register"
            && /* context.url.pathname != "/" && */ error != "Unauthorized") {
            console.error("Hooks error", error);
            return context.redirect(`/login?next=${context.url.pathname}`, 302);
        }
    }


    const response = await next();
    return response;
});