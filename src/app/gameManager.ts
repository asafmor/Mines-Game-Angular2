import { MinesGame } from "./minesGame.class";
import { MineTile, ObstacleTile, SlipperyTile, VisitedTile } from "./tiles.class";
import { Injectable } from "@angular/core";

@Injectable()
export class GameManager {

	private minesGame: MinesGame;

	tiles: number;
	difficultyLevel: number;

	private numberOfMines: number;
	private numberOfObstacles: number;

	numberOfTilesOptions: number[] = [5, 7, 9, 11, 13];
	difficultyLevelOptions: number[] = [1, 2, 3, 4, 5];

	constructor() {
		this.minesGame = null;
		this.tiles = 9;
		this.difficultyLevel = 3;

		// auto-play on startup
		this.play();
	}

	get boardSize() {
		return this.minesGame.boardSize;
	}

	get score() {
		return this.minesGame.score;
	}

	getTile(x: number, y: number) {
		if (this.minesGame == null) {
			return "";
		}

		try {
			const t = this.minesGame.getTile(x, y);
			if (t) {
				if (this.minesGame.playerPositionX === x && this.minesGame.playerPositionY === y) {
					return "P";
				} else {
					return t.toString();
				}
			} else {
				return "";
			}
		} catch (Exception) {
			return "";
		}
	}

	getTileImage(x: number, y: number) {
		if (this.minesGame == null) {
			return "sprite-empty";
		}

		try {
			const t = this.minesGame.getTile(x, y);
			if (t) {
				if (this.minesGame.playerPositionX === x && this.minesGame.playerPositionY === y) {
					if (this.minesGame.gameOver) {
						return "sprite-player_dead";
					} else {
						return "sprite-player";
					}
				} else {
					if (t instanceof MineTile) {
						return "sprite-mine";
					} else if (t instanceof ObstacleTile) {
						return "sprite-rock";
					} else if (t instanceof VisitedTile) {
						return "sprite-visited";
					} else if (t instanceof SlipperyTile) {
						return "sprite-arrows";
					} else {
						return "sprite-empty";
					}
				}
			} else {
				return "sprite-empty";
			}
		} catch (Exception) {
			return "sprite-empty";
		}
	}

	play() {
		this.minesGame = new MinesGame(this.tiles);

		// calculate number of mines and number of obstacles according to difficulty level
		const size = this.tiles * this.tiles;
		this.numberOfMines = (this.difficultyLevel * 0.02) * size;
		this.numberOfObstacles = (this.difficultyLevel * 0.04) * size;

		this.minesGame.start(this.numberOfMines, this.numberOfObstacles);
	}

	stepRight() {
		if (this.minesGame != null) {
			this.minesGame.stepRight();
		}
	}

	stepLeft() {
		if (this.minesGame != null) {
			this.minesGame.stepLeft();
		}
	}

	stepUp() {
		if (this.minesGame != null) {
			this.minesGame.stepUp();
		}
	}

	stepDown() {
		if (this.minesGame != null) {
			this.minesGame.stepDown();
		}
	}
}
