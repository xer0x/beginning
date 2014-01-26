


var shapes = {
  loner : {
    shape : [
      ["X"]
    ]
  },
  minivBar : {
    shape : [
      ["X"],
      ["X"]
    ]
  },
  minihBar : {
    shape : [
      ["X","X"]
    ]
  },
  vBar : {
    shape : [
      ["X"],
      ["X"],
      ["X"]
    ]
  },
  hBlock : {
    shape : [
      ["X","X","X"],
      ["X","X","X"]
    ]
  },
  vBlock : {
    shape : [
      ["X","X"],
      ["X","X"],
      ["X","X"]
    ]
  },

  hBar : {
    shape : [
      ["X","X","X"]
    ]
  },
  square : {
    shape : [
      ["X","X"],
      ["X","X"],
    ]
  },
  leftL : {
    shape : [
      ["X","0"],
      ["X","0"],
      ["X","X"]
    ]
  },
  rightL : {
    shape : [
      ["0","X"],
      ["0","X"],
      ["X","X"]
    ]
  },
  x : {
    shape : [
      ["X","0","X"],
      ["0","X","0"],
      ["X","0","X"]
    ]
  },
  v : {
    shape : [
      ["X","0","X"],
      ["0","X","0"]
    ]
  },
  t : {
    shape : [
      ["X","X","X"],
      ["0","X","0"],
      ["0","X","0"]
    ]
  },
  tetris : {
    shape : [
      ["X","0"],
      ["X","X"],
      ["0","X"]
    ]
  },
  tetris : {
    shape : [
      ["X","0"],
      ["X","X"],
      ["0","X"]
    ]
  },
  circle : {
    shape : [
      ["X","X","X"],
      ["X","0","X"],
      ["X","X","X"]
    ]
  },
  diamond : {
    shape : [
      ["0","X","0"],
      ["X","0","X"],
      ["0","X","0"]
    ]
  }
}

function getPlayerShape(playerCount) {
  return Object.keys(shapes)[0];
}

shapes = countShapeSizes(shapes);

function countShapeSizes(shapes){
  for (var name in shapes){
    var xCount = 0;
    var shapeObj = shapes[name];
    var shape = shapeObj.shape;
    for(var i = 0; i < shape.length; i++){
      var row = shape[i];
      for(var j = 0; j < row.length; j++){
        var space = row[j];
        if(space == "X"){
          xCount++;
        }
      }
    }
    shapeObj.size = xCount;
  }
  return shapes;
}


function assignAllPlayerShapes(players){

  var playerCount = Object.keys(players).length;

  var assignedShapes = [];

  for (var name in shapes){
    var shapeObj = shapes[name];
  }

  var playersLeft = playerCount;

  while(playersLeft > 0) {
  var shapename = getShape(playersLeft);
    if(shapename){
      playersLeft = playersLeft - shapes[shapename].size;
      for(var i = 0; i < shapes[shapename].size; i++){
        assignedShapes.push(shapename);
      }
    }
  }

  var j = 0;
  for(var key in players){
    players[key].shape = assignedShapes[j];
    lastAssigned = assignedShapes[j];
    j++;
  }

  return players;
}



function getShape(maxSize){

  if(maxSize == 1){
    return "loner";
  }

  var key;
  var shapeCount = 0;
  var shapeNames = [];

  for (key in shapes) {
    if(shapes.hasOwnProperty(key)){
      shapeNames.push(key);
      shapeCount++;
    }
  }

  var random = Math.floor((Math.random()*shapeNames.length));
  var shapeName = shapeNames[random];

  if (shapes[shapeName].size <= maxSize && shapeName != "loner") {
    return shapeName;
  }

}


module.exports = {
  shapes: shapes,
  getPlayerShape: getPlayerShape,
  assignAllPlayerShapes : assignAllPlayerShapes
};


var oldShapes = {
  simple : [
    ["X", "X"]
  ],
  vBar : [
    ["X"],
    ["X"],
    ["X"]
  ],
  hBar : [
    ["X","X","X"]
  ],
  square : [
    ["X","X"],
    ["X","X"]
  ],
  v : [
    ["X","0","X"],
    ["0","X","0"]
  ],
  x : [
    ["X","0","X"],
    ["0","X","0"],
    ["X","0","X"]
  ]
}


function test() {

  var players = {
    1 : {
      name: "jim",
      x : 0,
      y : 0,
      shape : "simple",
      score : 0
    },
    2 : {
      name : "bob",
      x : 1,
      y : 0,
      shape : "simple",
      score: 0
    },
    3 : {
      name : "steve",
      x : 5,
      y : 3,
      shape : "square",
      score: 0
    },
    4 : {
      name : "ste33ve",
      x : 4,
      y : 3,
      shape : "square",
      score: 0
    },
    5 : {
      name : "sadsad",
      x : 6,
      y : 3,
      shape : "square",
      score: 0
    }
  }

  // var grid = buildBoard(16, players);
  // drawBoard(grid);
  // assignAllPlayerShapes(players);
  // console.log(players);

  // var results = checkShapes(players, grid);
  // console.log(results);
}

// test();


