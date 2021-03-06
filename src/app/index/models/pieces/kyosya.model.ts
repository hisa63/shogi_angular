// import { triggerAsyncId } from 'async_hooks'
import {BasePieceClass} from './basePiece.model'

export class Kyosya extends BasePieceClass {
  public printPiece () {
    if (this.promotion)
      return '杏'
    else
      return '香'
  }

  public canPromoteTo(): boolean {
    if (!this.active) return false
    if (this.player === this.board.player1 && this.currentPosition[0] === 0) this.promotion = true
    else if (this.player === this.board.player1 && this.currentPosition[0] < 3) return true
    if (this.player === this.board.player2 && this.currentPosition[0] === 8) this.promotion = true
    else if (this.player === this.board.player2 && this.currentPosition[0] > 5) return true
    return false
  }

  public inActiveMovableTo(): void {
    let rowNumber = 0
    for (let row of this.board.positions) {
      let columnNumber = 0
      for (let column of row) {
        if (this.checkForbiddenArea(rowNumber) && column === null)
          this.canMoveAllPosition.push([rowNumber, columnNumber])
        columnNumber++
      }
      rowNumber++
    }
  }

  public checkForbiddenArea(row: number) :boolean {
    let forbiddenArea = this.player.isFirstMove ? 0 : 8
    if (row === forbiddenArea) return false
    return true
  }

  public canMoveToWithoutObstical () {
    if (this.promotion) {
      return [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [1, 0], [0, 1]
      ]
    } else {
      return [
        [-1, 0], [-2, 0], [-3, 0],
        [-4, 0], [-5, 0], [-6, 0],
        [-7, 0], [-8, 0]
      ]
    }
  }
  public movableTo(currentPosition: number[]): void {
    this.canMoveAllPosition = []
    this.board.selectedPiece = this
    if (this.promotion === false) this.bigPieceMove(currentPosition, this.player.isFirstMove ? [[-1, 0]] : [[1, 0]])
    else this.checkMovableArea(currentPosition)
    if(this.active === false) this.inActiveMovableTo()
  }

  public bigPieceMove(currentPosition: number[], directions: number[][]): void {
    directions.forEach(direction => {
      let checkPosition = [currentPosition[0], currentPosition[1]]
      while (true) {
        checkPosition = [checkPosition[0] + direction[0], checkPosition[1] + direction[1]]
        if(!this.isOnBoard(checkPosition[0], checkPosition[1])) break
        let nextCheckArea = this.board.positions[checkPosition[0]][checkPosition[1]]
        if (nextCheckArea) { // piece exists
          if(nextCheckArea.player.isFirstMove === this.player.isFirstMove) {
            break 
          } else { 
            this.canMoveAllPosition.push(checkPosition)
            break
          }
        } else {  // piece DOES NOT exist
          this.canMoveAllPosition.push(checkPosition)
        }
      }
    })
    if (this.promotion) this.isPromotionMoveCheck(this.canMoveToWithoutObstical(), currentPosition)
  }
}