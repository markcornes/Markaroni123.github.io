const cellSize = 10;

class Grid {
  constructor(width, height){
    this.width = (width - width % cellSize) / cellSize;
    this.height = (height - height % cellSize) / cellSize;
    this.centre = {x: Math.floor(this.width/2), y: Math.floor(this.height/2)}

    this.gridArray = this.makeArray();

    this.gridArray[this.centre.y][this.centre.x].toggle()
    this.gridArray[this.centre.y-1][this.centre.x-1].toggle()
    this.gridArray[this.centre.y][this.centre.x+1].toggle()
    this.gridArray[this.centre.y-1][this.centre.x+1].toggle()
    this.gridArray[this.centre.y-2][this.centre.x+1].toggle()
  }

  draw(ctx){
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        this.gridArray[i][j].draw(ctx);

      }
    }
  }

  update() {
    let tempArray = this.makeArray();
    let isEmpty = false;

    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        let cell = this.gridArray[i][j];
        let n = this.getNeighbours(cell);
        isEmpty = isEmpty | cell.active;

        if(cell.active) {
          tempArray[i][j].set(true);
          if(n < 2) tempArray[i][j].set(false);
          else if(n > 3) tempArray[i][j].set(false);
        } else {
          tempArray[i][j].set(false);
          if(n == 3) tempArray[i][j].set(true);
        }

      }
    }

    this.gridArray = tempArray;
    return isEmpty;
  }

  getNeighbours(cell) {
    let n = 0;

    if(!(cell.x == 0)){
      if(!(cell.y == 0)) {
        if(this.gridArray[cell.y-1][cell.x-1].active) n++;
      }
      if(!(cell.y == this.height-1)) {
        if(this.gridArray[cell.y+1][cell.x-1].active) n++;
      }
      if(this.gridArray[cell.y][cell.x-1].active) n++;
    }

    if(!(cell.x == this.width-1)) {
      if(!(cell.y == 0)) {
        if(this.gridArray[cell.y-1][cell.x+1].active) n++;
      }
      if(!(cell.y == this.height-1)){
        if(this.gridArray[cell.y+1][cell.x+1].active) n++;
      }
      if(this.gridArray[cell.y][cell.x+1].active) n++;
    }

    if(!(cell.y == 0)) {
      if(this.gridArray[cell.y-1][cell.x].active) n++;
    }

    if(!(cell.y == this.height-1)) {
      if(this.gridArray[cell.y+1][cell.x].active) n++;
    }

    return n;
  }

  makeArray() {
    var result = [];

    for(let i = 0; i < this.height; i++) {
      result.push([]);
      for(let j = 0; j < this.width; j++) {
        result[i].push(new Cell(j, i));
      }
    }

    return result;
  }

  clear() {
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        this.gridArray[i][j].set(false);
      }
    }
  }
}

class Cell {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.active = false;
  }

  draw(ctx){
    if(this.active){
      ctx.fillStyle = "red";
    } else{
      ctx.fillStyle = "#e1e1e1";
    }
    ctx.fillRect(this.x*cellSize+1, this.y*cellSize+1, cellSize-1, cellSize-1);

  }

  toggle() {
    this.active = !this.active;
  }

  set(state) {
    this.active = state;
  }
}
