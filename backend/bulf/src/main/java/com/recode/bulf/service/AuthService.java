package com.recode.bulf.service;

import com.recode.bulf.dto.AuthRequest;
import com.recode.bulf.dto.RegisterRequest;
import com.recode.bulf.dto.TokenResponse;
import com.recode.bulf.model.Token;
import com.recode.bulf.model.User;
import com.recode.bulf.repository.TokenRepository;
import com.recode.bulf.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public TokenResponse register(final RegisterRequest request) {
        try {
            final User user = User.builder()
                    .username(request.username())
                    .email(request.email())
                    .password(passwordEncoder.encode(request.password()))
                    .build();
            final User savedUser = userRepository.save(user);
            final String jwtToken = jwtService.generateToken(savedUser);
            final String refreshToken = jwtService.generateRefreshToken(savedUser);

            saveUserToken(savedUser, jwtToken);
            return new TokenResponse(jwtToken, refreshToken);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Username or email already exists.");
        } catch (Exception e) {
            throw new RuntimeException("Error occurred during registration: " + e.getMessage());
        }
    }

    public TokenResponse authenticate(final AuthRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        try {
            final User user = userRepository.findByEmail(request.email()).orElseThrow(() -> new IllegalArgumentException("User not found with email: " + request.email()));
            final String accessToken = jwtService.generateToken(user);
            final String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllUserTokens(user);
            saveUserToken(user, accessToken);
            return new TokenResponse(accessToken, refreshToken);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred during authentication: " + e.getMessage());
        }
    }

    private void saveUserToken(User user, String jwtToken) {
        try {
            final Token token = Token.builder()
                    .user(user)
                    .token(jwtToken)
                    .tokenType(Token.TokenType.BEARER)
                    .isExpired(false)
                    .isRevoked(false)
                    .build();
            tokenRepository.save(token);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while saving user token: " + e.getMessage());
        }
    }

    private void revokeAllUserTokens(final User user) {
        try {
            final List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
            if (!validUserTokens.isEmpty()) {
                validUserTokens.forEach(token -> {
                    token.setIsExpired(true);
                    token.setIsRevoked(true);
                });
                tokenRepository.saveAll(validUserTokens);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while revoking user tokens: " + e.getMessage());
        }
    }

    public TokenResponse refreshToken(@NotNull final String authentication) {
        try {
            if (authentication == null || !authentication.startsWith("Bearer ")) {
                throw new IllegalArgumentException("Invalid auth header");
            }
            final String refreshToken = authentication.substring(7);
            final String userEmail = jwtService.extractEmail(refreshToken);
            if (userEmail == null) {
                throw new IllegalArgumentException("Invalid refresh token");
            }

            final User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));
            final boolean isTokenValid = jwtService.isTokenValid(refreshToken, user.getEmail());
            if (!isTokenValid) {
                throw new IllegalArgumentException("Invalid refresh token");
            }

            final String accessToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, accessToken);

            return new TokenResponse(accessToken, refreshToken);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error occurred during token refresh: " + e.getMessage());
        }
    }
}