define(function () {

    var mapper = {
        threePointsToAffineTransform: function (d0, d1, d2, s0, s1, s2) {
            
            var X = 0,
                Y = 1,
                divider = ((s0[X] - s2[X]) * (s1[Y] - s2[Y])) - ((s1[X] - s2[X]) * (s0[Y] - s2[Y])),
                transform = {};
        
            if (divider === 0.0) {
                window.log("Divider is ZERO");
            } else {
                
                transform.a = ((d0[X] - d2[X]) * (s1[Y] - s2[Y])) - ((d1[X] - d2[X]) * (s0[Y] - s2[Y]));
                transform.b = ((s0[X] - s2[X]) * (d1[X] - d2[X])) - ((d0[X] - d2[X]) * (s1[X] - s2[X]));
                transform.c = (s2[X] * d1[X] - s1[X] * d2[X]) * s0[Y] + (s0[X] * d2[X] - s2[X] * d0[X]) * s1[Y] + (s1[X] * d0[X] - s0[X] * d1[X]) * s2[Y];
                transform.d = ((d0[Y] - d2[Y]) * (s1[Y] - s2[Y])) - ((d1[Y] - d2[Y]) * (s0[Y] - s2[Y]));
                transform.e = ((s0[X] - s2[X]) * (d1[Y] - d2[Y])) - ((d0[Y] - d2[Y]) * (s1[X] - s2[X]));
                transform.f = (s2[X] * d1[Y] - s1[X] * d2[Y]) * s0[Y] + (s0[X] * d2[Y] - s2[X] * d0[Y]) * s1[Y] + (s1[X] * d0[Y] - s0[X] * d1[Y]) * s2[Y];
            
                transform.a /= divider;
                transform.b /= divider;
                transform.c /= divider;
                transform.d /= divider;
                transform.e /= divider;
                transform.f /= divider;
            }
            return transform;
        },
        
        transformPoint: function (transform, point) {
            return {
                x: ((transform.a * point[X]) + (transform.b * point[Y]) + transform.c),
                y: ((transform.d * point[X]) + (transform.e * point[Y]) + transform.f)
            };
        }
    };

    return mapper;
});