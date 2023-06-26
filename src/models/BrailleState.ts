/**
 * The type of the state of six-dot braille
 */
interface SixDotBrailleStateType {
  dot1: boolean;
  dot2: boolean;
  dot3: boolean;
  dot4: boolean;
  dot5: boolean;
  dot6: boolean;
}

/**
 * The type of the state of eight-dot braille
 */
interface EightDotBrailleStateType {
  dot1: boolean;
  dot2: boolean;
  dot3: boolean;
  dot7: boolean;
  dot4: boolean;
  dot5: boolean;
  dot6: boolean;
  dot8: boolean;
}

export class BrailleState {
  private readonly _brailleDotCount: 6 | 8;
  private readonly _dot1: boolean;
  private readonly _dot2: boolean;
  private readonly _dot3: boolean;
  private readonly _dot7: boolean;
  private readonly _dot4: boolean;
  private readonly _dot5: boolean;
  private readonly _dot6: boolean;
  private readonly _dot8: boolean;

  public get brailleDotCount(): 6 | 8 {
    return this._brailleDotCount;
  }

  public get dot1(): boolean {
    return this._dot1;
  }

  public get dot2(): boolean {
    return this._dot2;
  }

  public get dot3(): boolean {
    return this._dot3;
  }

  public get dot7(): boolean {
    return this._dot7;
  }

  public get dot4(): boolean {
    return this._dot4;
  }

  public get dot5(): boolean {
    return this._dot5;
  }

  public get dot6(): boolean {
    return this._dot6;
  }

  public get dot8(): boolean {
    return this._dot8;
  }

  constructor(brailleState: SixDotBrailleStateType, brailleDotCount?: 6);
  constructor(brailleState: EightDotBrailleStateType, brailleDotCount?: 8);
  constructor(
    brailleState: SixDotBrailleStateType | EightDotBrailleStateType,
    brailleDotCount?: 6 | 8
  ) {
    this._brailleDotCount = brailleDotCount ?? 6;
    this._dot1 = brailleState.dot1;
    this._dot2 = brailleState.dot2;
    this._dot3 = brailleState.dot3;
    this._dot4 = brailleState.dot4;
    this._dot5 = brailleState.dot5;
    this._dot6 = brailleState.dot6;
    if (this._brailleDotCount === 6) {
      this._dot7 = false;
      this._dot8 = false;
    } else if (this._brailleDotCount === 8) {
      this._dot7 = (brailleState as EightDotBrailleStateType).dot7;
      this._dot8 = (brailleState as EightDotBrailleStateType).dot8;
    } else {
      throw new Error("Invalid Number of Dots of Braille");
    }
  }
}

/**
 * The default state of six-dot braille
 */
export const defaultSixDotBrailleStateValue = new BrailleState(
  {
    dot1: false,
    dot2: false,
    dot3: false,
    dot4: false,
    dot5: false,
    dot6: false,
  },
  6
);

/**
 * The default state of eight-dot braille
 */
export const defaultEightDotBrailleStateValue = new BrailleState(
  {
    dot1: false,
    dot2: false,
    dot3: false,
    dot7: false,
    dot4: false,
    dot5: false,
    dot6: false,
    dot8: false,
  },
  8
);

/**
 * The array of the available dots
 */
export const availableDots = [
  "dot1",
  "dot2",
  "dot3",
  "dot7",
  "dot4",
  "dot5",
  "dot6",
  "dot8",
];
