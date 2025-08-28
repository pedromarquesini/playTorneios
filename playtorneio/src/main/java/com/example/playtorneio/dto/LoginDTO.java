package com.example.playtorneio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginDTO {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String senha;

}
