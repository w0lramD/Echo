export let midiIn, midiOut;

export function midiConnect() {
  return navigator.requestMIDIAccess().then(
    midi =>
      function() {
        midi.addEventListener("statechange", event =>
          initDevices(event.target)
        );
        initDevices(midi);
      },
    err => console.log("Something went wrong", err)
  );
}

function initDevices(midi) {
  midiIn = [];
  midiOut = [];

  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }
  const outputs = midi.outputs.values();
  for (
    let output = outputs.next();
    output && !output.done;
    output = outputs.next()
  ) {
    midiOut.push(output.value);
  }
}
