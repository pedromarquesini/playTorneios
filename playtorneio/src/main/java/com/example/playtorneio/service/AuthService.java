package com.example.playtorneio.service;

import com.example.playtorneio.dto.LoginDTO;
import com.example.playtorneio.dto.RegistroDTO;
import com.example.playtorneio.model.Role;
import com.example.playtorneio.model.Usuario;
import com.example.playtorneio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public String registrar(RegistroDTO registro) {
        if (usuarioRepository.existsByEmail(registro.getEmail())) {
            return "Email já cadastrado";
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(registro.getEmail());
        usuario.setNome(registro.getNome());
        usuario.setSenha(registro.getSenha());
        usuario.setQuantidadeTimes(0);
        usuario.setQuantidadeCompeticoes(0);

        if (registro.getRole() == null) {
            usuario.setRole(Role.PUBLICO);
        } else {
            usuario.setRole(registro.getRole());
        }

        usuarioRepository.save(usuario);

        return "Usuário registrado com sucesso";
    }

    public boolean autenticar(LoginDTO login) {
        Optional<Usuario> userOptional = usuarioRepository.findByEmail(login.getEmail());
        return userOptional.isPresent() && userOptional.get().getSenha().equals(login.getSenha());
    }

}
