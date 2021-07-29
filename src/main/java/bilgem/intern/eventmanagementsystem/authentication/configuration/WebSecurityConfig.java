package bilgem.intern.eventmanagementsystem.authentication.configuration;


import bilgem.intern.eventmanagementsystem.authentication.jwt.JwtRequestFilter;
import bilgem.intern.eventmanagementsystem.authentication.service.UserAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
// Web ile ilgili konfigürasyon işlemlerini yaptığımız class'tır.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserAuthenticationProvider userAuthenticationProvider;
    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public WebSecurityConfig(UserAuthenticationProvider userAuthenticationProvider, JwtRequestFilter jwtRequestFilter) {
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.jwtRequestFilter = jwtRequestFilter;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(userAuthenticationProvider); //passwordencoder ve userdetails service kullanarak build ediyor
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin().disable() // kendimiz yazıyoruz formu
                .csrf().disable();

    }



    @Bean
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
