/****************************************************************/
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    /*****************************Fonction pour calculer le nombre de jour dans le mois ****************************************/
    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }

    /**********************************************************************/
    function drawText(text, y) {
      context.font = '14px serif';
      context.fillText(text, canvas.width/ 2 + 5, y);
      context.fillStyle = "white";
    }

    /****************************************************************/
    let drawArc = function (radiusArc, angle, color) {
      let x = canvas.width/ 2;
      let y = canvas.height/ 2;
      let radius = radiusArc;

      /* cercle incomplet, startAngle doit démarrer à 1.5 et endAngle est de min 1.6 à max 3.5*/
      let startAngle = 1.5 * Math.PI;
        let endAngle = angle; //pour la milliseconde

        let counterClockwise = false;
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = 15;

        // line color
        context.strokeStyle = color;
        context.stroke();
    }
    let horlogePolaire = function () {
      setInterval(function () {
        let momentDate = new Date();
        /****************************************************************/
        /*let radian = 1.6;*/
        let radian = Math.PI/2 + 0.1;
        let ecartAngle = 1.9;
        /***************************************************************/
        let momentMonth = momentDate.getMonth();
        let momentDayMonth = momentDate.getDate();
        let momentHours = momentDate.getHours();
        let momentMinutes = momentDate.getMinutes();
        let momentSecondes = momentDate.getSeconds();
        let momentMillisecondes = momentDate.getMilliseconds();

        let momentYear = momentDate.getFullYear();
        let numberDaysMonth = daysInMonth(momentMonth+1, momentYear);

        let monthEndAngle = (radian + (ecartAngle / 12) * (momentMonth + 1)) * Math.PI;
        let monthDayEndAngle = (radian + (ecartAngle / numberDaysMonth) * momentDayMonth) * Math.PI;
        let hoursEndAngle = (radian + (ecartAngle / 24 ) * momentHours) * Math.PI;
        let minutesEndAngle = (radian + (ecartAngle / 60) * momentMinutes) * Math.PI;
        let secondesEndAngle = (radian + (ecartAngle / 60) * momentSecondes) * Math.PI;
        let millisecondesEndAngle = (radian + (ecartAngle / 1000) * momentMillisecondes) * Math.PI ;

        /************************************************************************/
        if (momentSecondes = 60) {
          context.clearRect(0,0, canvasWidth, canvasHeight);
        }

        drawArc(375, millisecondesEndAngle, "#50514F");
        drawText("ms", 30);
        drawArc(350, secondesEndAngle, "#F25F5C");
        drawText("sec", 55);
        drawArc(325, minutesEndAngle, "#FFE066");
        drawText("min", 80);
        drawArc(300, hoursEndAngle, "#247BA0");
        drawText("hr", 105);
        drawArc(275, monthDayEndAngle, "#70C1B3");
        drawText("day", 130);
        drawArc(250, monthEndAngle, "#57886C");
        drawText("mth", 155);
      }, 100);
    }

    horlogePolaire();