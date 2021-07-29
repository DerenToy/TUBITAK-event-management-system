package bilgem.intern.eventmanagementsystem.authentication.jwt;

import bilgem.intern.eventmanagementsystem.authentication.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
// Gelen jwt'nin filtreden geçirildiği yer. doFilterInternal fonksiyonundaki koşullar sağlanmazsa back-end'e bağlanılamaz.
public class JwtRequestFilter extends OncePerRequestFilter {

    @Value("${security.jwt.secret-key}")
    private String secretKey;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtRequestFilter(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authenticationHeader =request.getHeader("Authorization");
        if(authenticationHeader != null && authenticationHeader.startsWith("Bearer")){
            String jwtToken  = authenticationHeader.substring(7);
            String username = JwtUtil.extractUsername(jwtToken, secretKey);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if(SecurityContextHolder.getContext().getAuthentication() == null){

                var token = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);
            }


        }
        filterChain.doFilter(request,response);
    }
}
