#!/usr/bin/env node

var asyncblock = require('asyncblock');
var exec = require('child_process').exec;

asyncblock(function (flow) {
  
  /*
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  */

  var zeroPad = function (num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  var scene = require('../scenes/printworks/scene.json');

  var VideoTimeline = require('../js/video-timeline.js').VideoTimeline;

  var timeline = new VideoTimeline();

  timeline.import(scene.video.timeline);

  var sceneName = 'printworks';

  for (var i = 0; i < scene.video.frames; i++) {
    var frame = zeroPad(i + 1, 5),
      filename = frame + '.png',
      points = timeline.points(i),
      pathIn = '../scenes/' + sceneName + '/videos/stills/' + filename,
      pathOut1 = '../scenes/' + sceneName + '/videos/stage1/' + filename,
      pathOut2 = '../scenes/' + sceneName + '/videos/stage2/' + filename,
      cmd,
      pointEnc =
        Math.floor(points[0][0]) + ',' + Math.floor(points[0][1]) + ' ' +
        Math.floor(points[1][0]) + ',' + Math.floor(points[1][1]) + ' ' +
        Math.floor(points[2][0]) + ',' + Math.floor(points[2][1]) + ' ' +
        Math.floor(points[3][0]) + ',' + Math.floor(points[3][1]);
    
    console.log('Processing ' + filename);
    
    cmd = "convert '" + pathIn + "' -draw 'fill black stroke none polygon " + pointEnc + "' '" + pathOut1 + "'";
  
    exec(cmd, flow.add());
    result = flow.wait();
    //console.log(result);
    
    var a = points[0], b = points[1], c = points[2], d1 = points[3], d2 = [0, 0],
      x = 0, y = 1;
    
    d2[x] = b[x] + (a[x] - b[x]) + (c[x] - b[x]);
    d2[y] = b[y] + (a[y] - b[y]) + (c[y] - b[y]);
    
    cmd = "convert '" + pathOut1 + "' -matte -virtual-pixel transparent -distort Perspective '" +
        a[x] + "," + a[y] + " " + a[x] + "," + a[y] + "    " +
        b[x] + "," + b[y] + " " + b[x] + "," + b[y] + "    " +
        c[x] + "," + c[y] + " " + c[x] + "," + c[y] + "    " +
        d1[x] + "," + d1[y] + " " + d2[x] + "," + d2[y] + "' " +
        pathOut2;
    
    exec(cmd, flow.add());
    result = flow.wait();
    //console.log(result);
  }    
});