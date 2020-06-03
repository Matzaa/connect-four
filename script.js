(function () {
    // startup ---------------------------------------------------------------
    var currentPlayer = "player1";
    $("#board").addClass("startBoard");
    $("h1").addClass("startTitle");

    var colRows = $(".column").children();
    var diagonals = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 31, 37],
        [23, 28, 33, 38],
    ];

    // mouse indicator -------------------------------------------------------
    $(document).on("mousemove", function (e) {
        var newX = e.pageX - 10;
        var newY = e.pageY - 10;
        $("#indicator").css({
            transform: "translate" + "(" + newX + "px, " + newY + "px)",
        });
    });

    // click! -------------------------------------------------------------------
    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        console.log("col?", col);

        // mouse indicator color --------------------------------------
        currentPlayer === "player1"
            ? $("#indicator").css({ border: "rgb(27, 143, 189) 8px solid" })
            : $("#indicator").css({ border: "black 8px solid" });

        currentPlayer === "player1"
            ? $("h1").css({ color: "rgb(27, 143, 189) 8px solid" })
            : $("h1").css({ color: "black 8px solid" });

        var columnIndex = $(e.currentTarget).index();
        console.log("columnIndex", columnIndex);

        //loops though all the slots , finds the first available -------------
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        console.log("i: ", i);
        var slotsInRow = $(".row" + i);
        // console.log("slotsinR", slotsInRow);
        if (i === -1) {
            return;
        }

        if (checkForVictory(slotsInCol)) {
            console.log("column VICTORY:", slotsInCol.eq(i));
            if (slotsInCol.eq(i).hasClass("player1")) {
                setTimeout(victoryPlayerOne, 100);
            } else {
                setTimeout(victoryPlayerTwo, 100);
            }
        } else if (checkForVictory(slotsInRow)) {
            console.log("ROW VICTORY:", slotsInRow.eq(i));
            if (slotsInRow.eq(i).hasClass("player1")) {
                setTimeout(victoryPlayerOne, 100);
            } else {
                setTimeout(victoryPlayerTwo, 100);
            }
        } else if (checkForVictoryDiagonally(colRows)) {
            console.log("D VICTORY:", colRows.eq(i));
            if (currentPlayer === "player1") {
                setTimeout(victoryPlayerOne, 100);
            } else {
                setTimeout(victoryPlayerTwo, 100);
            }
        } else {
            switchPlayer();
        }
    });

    function checkForVictory(slots) {
        // console.log("which slots?", slots);
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            // console.log("has current pl?", slots.eq(i).hasClass(currentPlayer));
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                console.log("count:", count);
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function checkForVictoryDiagonally(slots) {
        var count = 0;
        for (var i = 0; i < diagonals.length; i++) {
            for (var j = 0; j < diagonals[i].length; j++) {
                console.log("diagonal num", diagonals[i][j]);
                console.log("which slots?", slots.eq(diagonals[i][j]));
                if (slots.eq(diagonals[i][j]).hasClass(currentPlayer)) {
                    count++;
                    console.log("DiagCount:", count);
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }

    function switchPlayer() {
        currentPlayer === "player1"
            ? (currentPlayer = "player2")
            : (currentPlayer = "player1");
    }

    // victory pages ------------------------------------------------------

    function victoryPlayerOne() {
        $(".game-container").hide();
        $("h1").hide();
        $("#anotherGame1").removeClass("hideme");
        $("#indicator").hide();
        $("#everything").css({
            backgroundColor: "black",
        });
        setTimeout(disappear, 100);
    }

    function victoryPlayerTwo() {
        $(".game-container").hide();
        $("h1").hide();
        $("#anotherGame2").removeClass("hideme");
        $("#indicator").hide();
        $("#everything").css({
            backgroundColor: "rgb(27, 143, 189)",
        });
        $("p").css({
            color: "black",
        });
        $("h2").css({
            color: "black",
        });
        setTimeout(disappear, 100);
    }

    function disappear() {
        $("h2").addClass("disappear");
        $("p").addClass("grow");
    }

    // new game button ----------------------------------------------------
    $("button").on("click", function () {
        $(".game-container").show();
        $("h1").show();
        $("#anotherGame1").addClass("hideme");
        $("#anotherGame2").addClass("hideme");
        $("#indicator").show();
        currentPlayer === "player1"
            ? $("#indicator").css({ border: "black 8px solid" })
            : $("#indicator").css({ border: "rgb(27, 143, 189) 8px solid" });
        $("#everything").css({
            backgroundColor: "rebeccapurple",
        });
        $("p").css({
            color: "rebeccapurple",
        });
        $("h2").css({
            color: "rebeccapurple",
        });
        $("h2").removeClass("disappear");
        $("p").removeClass("grow");
        clearSlots($(".column").children());
    });

    function clearSlots(slots) {
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass("player1")) {
                slots.eq(i).removeClass("player1");
            }
            if (slots.eq(i).hasClass("player2")) {
                slots.eq(i).removeClass("player2");
            }
        }
    }
})();
