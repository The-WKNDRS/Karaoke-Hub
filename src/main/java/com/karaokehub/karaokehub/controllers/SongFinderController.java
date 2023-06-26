package com.karaokehub.karaokehub.controllers;

import com.karaokehub.karaokehub.config.ChatGPTConfig;
import com.karaokehub.karaokehub.models.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class SongFinderController {

    private final ChatGPTConfig chatGPTConfig;

    @Autowired
    public SongFinderController(ChatGPTConfig chatGPTConfig) {
        this.chatGPTConfig = chatGPTConfig;
    }

    @GetMapping("/song-finder")
    public String showSongFinderPage() {
        return "song-finder";
    }

    @PostMapping("/song-finder")
    public String processSongFinderForm(@RequestParam("vocalType") String vocalType,
                                        @RequestParam("musicGenre") String musicGenre,
                                        @RequestParam("era") String era,
                                        Model model) {
        if (vocalType.isEmpty() || musicGenre.isEmpty() || era.isEmpty()) {
            model.addAttribute("error", "All fields must be filled out.");
            return "song-finder";
        }

        List<Song> songs = getSongList(vocalType, musicGenre, era);

        model.addAttribute("songs", songs);

        return "song-finder";
    }

    private List<Song> getSongList(String vocalType, String musicGenre, String era) {
        // Call the API or perform any other logic to retrieve the song list
        // and return it as a List<Song>
        return Collections.emptyList(); // Placeholder for now
    }
}
