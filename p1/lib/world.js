var util = require('util');
var checker = require('./checker');
var shapes = require('./shapes');

var width = 10;
var height = 11;
var defaultRoundLength = 33
var secondsForIntermission = 7
var secondsLeft;
var roundFinished = true;
var lastTickState = null;

var players = {};
var grid = [];

function getGrid() {
  return {
    width: width,
    height: height,
    state: fetchState()
  };
}

function makeGrid() {
  grid = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = 0; //null;
    }
  }
}

function getStateTimer() {
  var state = roundFinished ? 'FINISHED' : 'START';
  return [state, secondsLeft];
}

// find a new spot with nobody on it
function getNewPosition() {
  var x, y;
  var placed = false;
  while (!placed) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    placed = isEmptyPosition(x, y);
  }
  return {x: x, y: y};
}

function isEmptyPosition(_x, _y) {
  //console.log('checking %d,%d', _x, _y);
  if (_x < 0 || _x >= width) return false;
  if (_y < 0 || _y >= height) return false;
  return !grid[_x][_y];
}

function addPlayer(playerId, callback) {
  var position = getNewPosition();
  var player = {
    id: playerId,
    x: position.x,
    y: position.y,
    name: 'Winner' + ('' + Math.random()).substring(2,6),
    score: 0,
    level: 1,
    shape: shapes.getPlayerShape(Object.keys(players).length)
  };
  grid[player.x][player.y] = playerId;
  players[playerId] = player;
  if (callback) callback(player);
}

function getPlayer(playerId) {
  return players[playerId];
}

function removePlayer(playerId) {
  var p = players[playerId];
  grid[p.x][p.y] = 0; //null;
  delete players[playerId];
}

function change(playerId, command) {
  // do something
  var c = command.split(' ');
  var type = ('' + c[0]).toUpperCase();
  var results = [];
  switch(type) {
    case 'MOVE':
      console.log('MOVE %s', playerId);
      var positions = move(playerId, c[1]);
      var dest = util.format('%d,%d', positions.dest.x, positions.dest.y);
      var old = util.format('%d,%d', positions.old.x, positions.old.y);
      results.push(util.format('MOVE %s %s %s', old, dest, playerId));
      showGrid();
      break;
    case 'SETNAME':
      var name = setName(playerId, command);
      if (name) {
        results.push(util.format('NAME %s %s', playerId, name));
      }
      break;
    default:
  }
  return results;
}

function setName(playerId, name) {
  var p = players[playerId];
  if (p && name) {
    p.name = name;
    return name;
  }
  return false;
}

// return representation of grid
// Grid to JSON text
function fetchState() {
  return JSON.stringify(grid);
  //return '__D_,____,HH__,_X__'
}

function showGrid() {
  var output = '';
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      output += ' ' + (grid[x][y] ? 'O' : '_');
    }
    output += '\n';
  }
  console.log(output);
}

var deltas = {
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  UP: [0, -1],
  DOWN: [0, 1]
};

function move(playerId, direction) {
  var p = players[playerId];
  var old = { x: p.x, y: p.y };
  var delta = deltas[direction];
  var dest = { x: p.x + delta[0], y: p.y + delta[1] };
  if (isEmptyPosition(dest.x, dest.y)) {
    // do movement
    p.x = dest.x;
    p.y = dest.y;
    grid[old.x][old.y] = 0; //null;
    grid[dest.x][dest.y] = playerId;
    //console.log('TODO: FLAG DIRTY MAP x,y?')
  } else {
    dest = old;
  }
  return {old: old, dest: dest};
}

function tick() {
  var messages = [];
  // Does +1 to score if in their shape
  if (!roundFinished) {
    checker.checkShapes(players, grid);
  }
  secondsLeft -= 1;
  printScores();
  if (roundFinished !== lastTickState) {
    if (roundFinished) {
      messages.push(util.format('FINISHED %s', secondsForIntermission));
      messages.push(util.format('SCORES %s', getScoreString()));
      messages.push(util.format('NAME %s', getNameString()));
    } else {
      messages.push(util.format('START %s', secondsLeft));
      messages.push(util.format('SHAPES %s', getShapeString()));
      messages.push(util.format('LEVELS %s', getLevelString()));
    }
  }
  lastTickState = roundFinished;
  return messages;
}

// print scores to server console
function printScores() {
  var playerIds = Object.keys(players);
  if (playerIds.length > 0) {
    console.log('Player scores');
    var p;
    for (var i=0; i < playerIds.length; i++) {
      p = players[playerIds[i]];
      console.log(util.format('%s  \t%d  \t%s', p.name, p.score, p.shape));
    }
  }
}

function getScoreString() {
  var scores = [];
  for (var id in players) {
    scores.push(id + ',' + players[id].score);
  }
  return scores.join(' ');
}

function updateLevels() {
  var p;
  for (var id in players) {
    p = players[id];
    if (p.score > 7) {
      p.level = (p.level + 1) || 1;
    } else if (p.score == 0) {
      p.level = p.level > 0 ? p.level - 1 : 0;
    }
  }
}

function clearScores() {
  for (var id in players) {
    players[id].totalScore = players[id].score + (players[id].totalScore || 0);
    players[id].score = 0;
  }
}

function getNameString() {
  var names = [];
  for (var id in players) {
    names.push(id + ',' + players[id].name);
  }
  return names.join(' ');
}

function getShapeString() {
  var shapes = [];
  for (var id in players) {
    shapes.push(id + ',' + players[id].shape);
  }
  return shapes.join(' ');
}

function getLevelString() {
  var levels = [];
  for (var id in players) {
    levels.push(id + ',' + players[id].level);
  }
  return levels.join(' ');
}

function init() {
  makeGrid();
  reset();
}

function reset() {
  shapes.assignAllPlayerShapes(players);
  secondsLeft = defaultRoundLength;
  roundFinished = false;
  updateLevels();
  clearScores();
  setTimeout(function() {
    roundFinished = true; // Next tick() will show intermission screen
    secondsLeft = secondsForIntermission;
    setTimeout(function() {
      reset(); // re-START the next round
    }, secondsForIntermission * 1000);
  }, secondsLeft * 1000);
}

init(); // initialize

module.exports = {
  getGrid: getGrid,
  addPlayer: addPlayer,
  getPlayer: getPlayer,
  removePlayer: removePlayer,
  getStateTimer: getStateTimer,
  change: change,
  tick: tick,
  reset: reset,
  init: init
};
