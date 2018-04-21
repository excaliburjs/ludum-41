import { Actor, Color, Vector } from "excalibur";

export class OfficeDoc extends Actor {
  private _pageNumber: number;

  constructor(pageNumber: number) {
    super({ x: 100 * pageNumber + 200, width: 50, height: 50, y: 500 });
    this._pageNumber = pageNumber;
    this.color = Color.Green;
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

  constructor(numDocuments: number) {
    this._numDocuments = numDocuments;
    for (var i = 0; i < this._numDocuments; i++) {
      this._documents.push(new OfficeDoc(i));
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
