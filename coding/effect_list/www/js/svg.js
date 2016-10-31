var macSafari = !1; - 1 != navigator.userAgent.indexOf("Mac OS X") && -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && (macSafari = !0);
var hero = Snap(".hero-svg"),
    startTime = Date.now(),
    animate_logo_time = 1e3,
    fade_2_time = 2500,
    honey_2_time = 2500,
    scale_2_time = 2250,
    draw_2_time = 2250,
    fade_3_time = 3e3,
    arrow_3_time = 3250,
    draw_3_time = 3500,
    scale_3_time = 3500,
    grow_3_time = 3500,
    fade_4_time = 3500,
    draw_4_time = 4250,
    scale_4_time = 4250,
    bounce_4_time = 4250,
    fade_5_time = 4e3,
    draw_5_time = 4500,
    scale_5_time = 4e3,
    bounce_5_1_time = 5500,
    bounce_5_2_time = 6250,
    introScript = {
        scene01: {
            logo: {
                callback: animate_fade,
                time: animate_logo_time,
                elem: "#logo"
            }
        },
        scene02: {
            scale: {
                callback: animate_scale,
                time: scale_2_time,
                elem: "#scale > g"
            },
            draw01: {
                callback: animate_draw,
                time: draw_2_time,
                elem: "#_1_string_overlay #left_1"
            },
            draw02: {
                callback: animate_draw,
                time: draw_2_time,
                elem: "#_1_string_overlay #right_1"
            },
            fade: {
                callback: animate_fade,
                time: fade_2_time,
                elem: "#fade"
            },
            honey: {
                callback: animate_honey_drip,
                time: honey_2_time,
                elem: "#honey_drip",
                speed: 6e3
            }
        },
        scene03: {
            scale: {
                callback: animate_scale,
                time: scale_3_time,
                elem: "#scale_1 > g"
            },
            draw: {
                callback: animate_asyncDraw,
                time: draw_3_time,
                elem: "#_2_ndring_overlay"
            },
            fade: {
                callback: animate_fade,
                time: fade_3_time,
                elem: "#fade_1"
            },
            arrow01: {
                callback: fire_arrow,
                time: arrow_3_time,
                elem: "#left_arrow",
                speed: 1e3
            },
            arrow02: {
                callback: fire_arrow,
                time: arrow_3_time,
                elem: "#right_arrow",
                speed: 1e3
            },
            grow: {
                callback: grow,
                time: grow_3_time,
                elem: "#grow_leaf .grow"
            }
        },
        scene04: {
            scale: {
                callback: animate_scale,
                time: scale_4_time,
                elem: "#scale_2 > g"
            },
            draw: {
                callback: animate_asyncDraw,
                time: draw_4_time,
                elem: "#_3_rdring_overlay"
            },
            fade: {
                callback: animate_fade,
                time: fade_4_time,
                elem: "#fade_2"
            }
        },
        scene05: {
            scale: {
                callback: animate_scale,
                time: scale_5_time,
                elem: "#scale_3 > g"
            },
            draw: {
                callback: animate_asyncDraw,
                time: draw_5_time,
                elem: "#_4_thring_overlay"
            },
            fade: {
                callback: animate_fade,
                time: fade_5_time,
                elem: "#fade_3"
            },
            bounce03: {
                callback: bounce_down,
                time: bounce_5_1_time,
                elem: "#left_strawberry",
                speed: 1500
            },
            bounce04: {
                callback: bounce_down,
                time: bounce_5_1_time,
                elem: "#right_strawberry",
                speed: 1500
            },
            bounce01: {
                callback: bounce_down,
                time: bounce_5_2_time,
                elem: "#left_feather",
                speed: 1500
            },
            bounce02: {
                callback: bounce_down,
                time: bounce_5_2_time,
                elem: "#right_feather",
                speed: 1500
            }
        }
    },
    resizeScript = {
        scene01: {
            honey: {
                callback: animate_honey_drip,
                time: 1e3,
                elem: "#honey_drip",
                speed: 6e3
            },
            arrow01: {
                callback: fire_arrow,
                time: 1250,
                elem: "#left_arrow",
                speed: 1e3
            },
            arrow02: {
                callback: fire_arrow,
                time: 1250,
                elem: "#right_arrow",
                speed: 1e3
            },
            scale: {
                callback: animate_scale,
                time: 1e3,
                elem: "#scale > g"
            },
            scale01: {
                callback: animate_scale,
                time: 1250,
                elem: "#scale_1 > g"
            },
            scale02: {
                callback: animate_scale,
                time: 1500,
                elem: "#scale_2 > g"
            },
            scale03: {
                callback: animate_scale,
                time: 1750,
                elem: "#scale_3 > g"
            },
            bounce03: {
                callback: bounce_down,
                time: 2500,
                elem: "#left_strawberry",
                speed: 1500
            },
            bounce04: {
                callback: bounce_down,
                time: 2500,
                elem: "#right_strawberry",
                speed: 1500
            },
            bounce05: {
                callback: bounce_down,
                time: 3e3,
                elem: "#left_feather",
                speed: 1500
            },
            bounce06: {
                callback: bounce_down,
                time: 3e3,
                elem: "#right_feather",
                speed: 1500
            }
        }
    };
$(function() {
    getViewportWidth() > 568 && $(".hero-svg").length ? macSafari ? Snap.load("../img/SMIC-001_hero-04_v4_1.svg", function(e) {
        hero.append(e)
    }) : Snap.load("../img/SMIC-001_hero-04_v4.svg", function(e) {
        var a, t;
        hero.append(e), hero.selectAll(".fade, .grow, .scale > g").attr({
            opacity: 0
        });
        for (a in introScript)
            for (t in introScript[a]) setTimeout(introScript[a][t].callback, introScript[a][t].time, introScript[a][t].elem, introScript[a][t].speed)
    }) : getViewportWidth() < 569 && $(".hero-svg").length && (Snap.load("../img/mobile-hero.svg", function(e) {
        hero.append(e)
    }), $(".hero-svg").css("margin-left", (getViewportWidth() - 624) / 2)), $(window).resize(function() {
        getViewportWidth() > 568 && $(".mobile").length && $(".hero-svg").length && (macSafari || $(".hero-svg").fadeOut(400, function() {
            $(".hero-svg").html(""), $(".hero-svg").removeAttr("style"), Snap.load("../img/SMIC-001_hero-04_v4.svg", function(e) {
                var a, t;
                hero.append(e), $(".hero-svg").fadeIn(), hero.selectAll("#_1_string_overlay, #_2_ndring_overlay, #_3_rdring_overlay, #_4_thring_overlay, .scale > g").attr({
                    opacity: 0
                });
                for (a in resizeScript)
                    for (t in resizeScript[a]) setTimeout(resizeScript[a][t].callback, resizeScript[a][t].time, resizeScript[a][t].elem, resizeScript[a][t].speed)
            })
        })), getViewportWidth() < 569 && $(".desktop").length && $(".hero-svg").length && $(".hero-svg").fadeOut(400, function() {
            $(".hero-svg").html(""), Snap.load("../img/mobile-hero.svg", function(e) {
                hero.append(e), $(".hero-svg").fadeIn()
            })
        }), getViewportWidth() > 568 || $(".hero-svg").css("margin-left", (getViewportWidth() - 624) / 2)
    })
});