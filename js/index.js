$(document).ready(function(){
	var c = {
        on:[45,195,180,0],
        tw:[240,255,230],
        tr:[231,30,55],
    };
    var end = 1;
    function colorChange(){
    	$("body").css({
    	"background":"linear-gradient(rgb("+c.on[0]+","+c.on[1]+","+c.on[2]+"),rgb("+c.tw[0]+","+c.tw[1]+","+c.tw[2]+"),rgb("+c.tr[0]+","+c.tr[1]+","+c.tr[2]+"))"
    });
    }
    function main(){
    	colorChange();
        if(c.on[3]==0){
            c.on[0]+=2.5;
            c.tr[1]+=2.5;
            c.tr[2]+=2.5;
            c.tw[1]-=2;
            c.tw[2]-=2;
            if(c.on[0]>255){
                c.on[3]=1;
            }
        };
        if(c.on[3]==1){
            c.on[0]-=2.5;
            c.tr[1]-=2.5;
            c.tr[2]-=2.5;
            c.tw[1]+=2;
            c.tw[2]+=2;
            if(c.on[0]<45){
                c.on[3]=0;
            }
        }
    }
    setInterval(main, 100);
});