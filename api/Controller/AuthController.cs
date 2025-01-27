using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

[Route("api/login")]
[ApiController]

public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost()]
    public IActionResult Login([FromBody] User user)
    {
        if (user.Name == "admin" && user.Password == "password")
        {
            var token = _authService.GenerateToken(user);
            return Ok(new { token });
        }
        return Unauthorized();
    }

}