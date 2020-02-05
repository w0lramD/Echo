import React from "react";
import { midiToNoteName, toMidi } from "@tonaljs/midi";
import "./Note.sass";

export default function Note({ value, focus }) {
  value = toMidi(value);
  return (
    <div className={(focus && "Note focus") || "Note"}>
      {(Number.isInteger(value) && midiToNoteName(value)) || value}
    </div>
  );
}
