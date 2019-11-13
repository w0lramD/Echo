export let midiIn, midiOut;

export async function midiConnect() {
  try {
    const midi = await navigator.requestMIDIAccess();
    initDevices(midi);
  } catch (err) {
    console.log("MIDI not supported", err);
  }
}

export function initDevices(midi) {
  midi.addEventListener("statechange", event => initDevices(event.target));

  // Reset.
  midiOut = [];
  midiIn = [];

  // MIDI devices that send you data
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }

  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (
    let output = outputs.next();
    output && !output.done;
    output = outputs.next()
  ) {
    midiOut.push(output.value);
  }
}
