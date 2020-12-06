import {BasePieceClass} from './basePiece.model'

export class Kaku extends BasePieceClass {
  moveDirection = [[-1, 1],[-1, -1],[1, 1],[1, -1]]

  public printPiece () {
    if (this.promotion)
      return '馬'
    else
      return '角' 
  }

  public canMoveToWithoutObstical () {
    if (this.promotion) { 
      return [[-1, 0],[0, 1], [1, 0], [0, -1]]
    } else {
      return [
        [1, 1],[2, 2],[3, 3],[4, 4],[5, 5],[6, 6],[7, 7],[8, 8],
        [1, -1],[2, -2],[3, -3],[4, -4],[5, -5],[6, -6],[7, -7],[8, -8],
        [-1, 1],[-2, 2],[-3, 3],[-4, 4],[-5, 5],[-6, 6],[-7, 7],[-8, 8],
        [-1, -1],[-2, -2],[-3, -3],[-4, -4],[-5, -5],[-6, -6],[-7, -7],[-8, -8]
      ]
    }
  }
}