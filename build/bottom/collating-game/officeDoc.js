import { Actor, Color } from "excalibur";
export class OfficeDoc extends Actor {
    constructor(pageNumber, art) {
        super();
        this._pageNumber = pageNumber;
        this.color = Color.Green;
        this.addDrawing("default", art[this._pageNumber].getSprite(0));
        this.addDrawing("numbered", art[this._pageNumber].getSprite(1));
    }
    get pageNumber() {
        return this._pageNumber;
    }
}
export class OfficeDocSet {
    constructor(numDocuments, art) {
        this._documents = [];
        this._playerSortedStack = [];
        this._numDocuments = numDocuments;
        for (var i = 0; i < this._numDocuments; i++) {
            this._documents.push(new OfficeDoc(i, art));
        }
    }
    //attempt to add this document to the sorted stack
    tryAddToSortedStack(documentIn) {
        if (documentIn.pageNumber === this._playerSortedStack.length) {
            this._playerSortedStack.push(documentIn);
            return true;
        }
        else {
            return false;
        }
    }
    clear() {
        this._playerSortedStack = [];
    }
    isComplete() {
        return this._playerSortedStack.length === this._numDocuments;
    }
    getScrambledDocumentSet() {
        var docsArr = this._documents;
        var currentIndex = docsArr.length, temporaryValue, randomIndex;
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
//# sourceMappingURL=officeDoc.js.map