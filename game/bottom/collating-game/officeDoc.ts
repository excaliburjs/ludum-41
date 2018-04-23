import { Actor, Color, Label, SpriteSheet } from "excalibur";
import Resources from "../../resources";

export class OfficeDoc extends Actor {
  private _pageNumber: number;
  private _officeDocSet: OfficeDocSet;

  constructor(pageNumber: number, art: SpriteSheet[]) {
    super();
    this._pageNumber = pageNumber;
    this.color = Color.Green;
    this.addDrawing("default", art[this._pageNumber].getSprite(0));
    this.addDrawing("numbered", art[this._pageNumber].getSprite(1));
  }

  public get pageNumber(): number {
    return this._pageNumber;
  }
}

export class OfficeDocSet {
  private _documents: Array<OfficeDoc> = [];
  private _playerSortedStack: Array<OfficeDoc> = [];
  private _numDocuments: number;
  private _isScrambled: boolean;

  constructor(numDocuments: number, art: SpriteSheet[]) {
    this._numDocuments = numDocuments;
    for (var i = 0; i < this._numDocuments; i++) {
      this._documents.push(new OfficeDoc(i, art));
    }
  }

  //attempt to add this document to the sorted stack
  public tryAddToSortedStack(documentIn: OfficeDoc): boolean {
    if (documentIn.pageNumber === this._playerSortedStack.length) {
      this._playerSortedStack.push(documentIn);
      return true;
    } else {
      return false;
    }
  }

  public clear(): void {
    this._playerSortedStack = [];
  }

  public isComplete(): boolean {
    return this._playerSortedStack.length === this._numDocuments;
  }

  public getScrambledDocumentSet(): Array<OfficeDoc> {
    var docsArr = this._documents;
    var currentIndex = docsArr.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = docsArr[currentIndex];
      docsArr[currentIndex] = docsArr[randomIndex];
      docsArr[randomIndex] = temporaryValue;
    }

    return docsArr;
  }
}
