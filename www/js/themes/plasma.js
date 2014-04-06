// See: http://www.bidouille.org/prog/plasma
define(['stage/led', 'lib'], function (led, lib) {
   var theme = {
      name: 'Plasma',
      usesTick: true,
      on: function (display) {
         this.display = display;
      },
      off: function (display) {
         this.display = null;
      },
      nx: function (x) {
         return x / (this.display.rows * 8);
      },
      ny: function (y) {
         return y / (this.display.rows * 8);
      },
      setFrame: function (frame) {
         var cols = this.display.cols,
            rows = this.display.rows,
            y, x,
            display = this.display,
            d,
            time = frame / 30,
            v,
            ny;

         for (y = 0; y < rows; y++) {
            ny = this.ny(y);
            for (x = 0; x < cols; x++) {
               d = display.getLED(x, y);
               v = this.getPlasma(this.nx(x), ny, time);
               d.type = this.getType(v);
            }
         }
      },
      getType: function (v) {
         v = Math.sin(v);
         if (v < -0.7) {
            return led.type.red;
         } else if (v < -0.4) {
            return led.type.orange;
         } else if (v < -0.1) {
            return led.type.yellow;
         } else if (v < 0.3) {
            return led.type.green;
         } else if (v < 0.6) {
            return led.type.cyan;
         } else if (v < 0.8) {
            return led.type.blue;
         } else if (v < 0.9) {
            return led.type.purple;
         } else {
            return led.type.pink;
         }
      },
      getPlasma: function (x, y, time) {
         var v = 0, cx, cy;
         v += Math.sin((x * 10 + time));
         v += Math.sin((y * 10 + time) / 2.0);
         v += Math.sin((x * 10 + y * 10 + time) / 2.0);
         cx = x + 0.5 * Math.sin(time / 5.0);
         cy = y + 0.5 * Math.cos(time / 3.0);
         v += Math.sin(Math.sqrt(10 * (cx * cx + cy * cy) + 1) + time);
         v = v / 2.0;
         return v;
      }
   };
   return theme;
});