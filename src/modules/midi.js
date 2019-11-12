export let midiIn, midiOut;
let delay = 0.5;

export async function midiConnect() {
  try {
    const midi = await navigator.requestMIDIAccess();
    midiReady(midi);
  } catch (err) {
    console.log("MIDI not supported", err);
  }
}

function midiReady(midi) {
  initDevices(midi);
}

function initDevices(midi) {
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

  for (const input of midiIn) {
    input.addEventListener("midimessage", midiMessageReceived);
  }
}

function midiMessageReceived(e) {
  feedbackDelay(e, 1000, 1000);
}

function feedbackDelay(e, time, loop) {
  const device = midiOut[0];
  setTimeout(() => {
    console.log(e.data);
    device.send(e.data);
    loop -= 1;
    if (loop > 0) feedbackDelay(e, time, loop);
  }, time);
}
