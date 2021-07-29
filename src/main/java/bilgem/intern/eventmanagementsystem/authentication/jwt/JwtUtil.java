package bilgem.intern.eventmanagementsystem.authentication.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;


// Token'ı ürettiğimiz class
public class JwtUtil {

    public static String generateToken(Authentication user, String key){
        return Jwts.builder()
                .setSubject(user.getName())
                .claim("authorities", getAuthorities(user))
                .setExpiration(getExpirationDate())
                .signWith(Keys.hmacShaKeyFor(key.getBytes())) // algoritma ile imzaladı
                .compact();


    }

    private static List<String> getAuthorities(Authentication user){
        return user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

    }

    private static Date getExpirationDate(){
        Instant expirationTime = LocalDate.now()
                .plusDays(7)
                .atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant();

        return Date.from(expirationTime); // şuandan alıp 7 gün ekliyor
    }

    public static String extractUsername(String jwtToken, String secretKey) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
        return claims.getSubject();



    }
}
