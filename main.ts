function getLength () {
    upHalf = 0
    downHalf = 0
    while (upHalf == 0 && downHalf == 0) {
        pins.i2cWriteNumber(
        44,
        51,
        NumberFormat.UInt8BE,
        false
        )
        check = pins.i2cReadNumber(44, NumberFormat.UInt8BE, false)
        if (check == 1) {
            basic.pause(6)
            pins.i2cWriteNumber(
            44,
            16,
            NumberFormat.UInt8BE,
            false
            )
            sumHalf = pins.i2cReadNumber(44, NumberFormat.UInt8BE, false)
            basic.pause(1)
            pins.i2cWriteNumber(
            44,
            15,
            NumberFormat.UInt8BE,
            false
            )
            upHalf = pins.i2cReadNumber(44, NumberFormat.UInt8BE, false)
            basic.pause(1)
            pins.i2cWriteNumber(
            44,
            14,
            NumberFormat.UInt8BE,
            false
            )
            downHalf = pins.i2cReadNumber(44, NumberFormat.UInt8BE, false)
            if (sumHalf != Math.constrain(upHalf + downHalf, 0, 255)) {
                upHalf = 0
                downHalf = 0
            }
        }
    }
    time = upHalf * 256 + downHalf
    length = (time - 160) / 2 * 0.315
    return length
}
function setSpeed (left: number, right: number) {
    pins.analogWritePin(AnalogPin.P13, left)
    pins.analogWritePin(AnalogPin.P14, right)
}
let length = 0
let time = 0
let sumHalf = 0
let check = 0
let downHalf = 0
let upHalf = 0
pins.analogSetPitchPin(AnalogPin.P8)
music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
let STOP_SPEED = 511
let PRESET_PALSE = 1000
let MAX_SPEED = 1023
let MIN_SPEED = 0
pins.analogWritePin(AnalogPin.P13, STOP_SPEED)
pins.analogWritePin(AnalogPin.P14, STOP_SPEED)
pins.analogSetPeriod(AnalogPin.P13, PRESET_PALSE)
pins.analogSetPeriod(AnalogPin.P14, PRESET_PALSE)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
basic.pause(1000)
basic.forever(function () {
    if (Math.trunc(getLength()) < 100) {
        setSpeed(767, 767)
    } else if (Math.trunc(getLength()) < 0) {
        setSpeed(STOP_SPEED, STOP_SPEED)
    } else {
        setSpeed(255, 255)
        basic.pause(1000)
        setSpeed(767, 255)
        basic.pause(2000)
    }
})
