import { Actor, Color } from "excalibur";
import Resources from "../../resources";
export class OfficeDoc extends Actor {
    constructor(pageNumber) {
        super();
        this._pageNumber = pageNumber;
        this.color = Color.Green;
        switch (this._pageNumber) {
            case 0:
                this.addDrawing(Resources.txDocPieChart);
                break;
            case 1:
                this.addDrawing(Resources.txDocBarGraph);
                break;
            case 2:
                this.addDrawing(Resources.txDocLineGraph);
                break;
            case 3:
                this.addDrawing(Resources.txDocVennDiagram);
                break;
            case 4:
                this.addDrawing(Resources.txDocMoney);
                break;
        }
    }
    get pageNumber() {
        return this._pageNumber;
    }
}
export class OfficeDocSet {
    constructor(numDocuments) {
        this._documents = [];
        this._playerSortedStack = [];
        this._numDocuments = numDocuments;
        for (var i = 0; i < this._numDocuments; i++) {
            this._documents.push(new OfficeDoc(i));
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