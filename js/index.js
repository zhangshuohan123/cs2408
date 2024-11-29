let re;

$.ajax({
    url: "./api/index.json", dataType: 'json',
    success: function (result) {
        re = $.parseJSON(JSON.stringify(result));
        var i = 0;
        for (var k = 0; k < re.rand_num; k++) {
            while (true) {
                let dormitory = rnd(i++) % re.dormitories.length;
                dormitory = re.dormitories[dormitory];
                let member = rnd(i++) % dormitory.members.length;
                let dormitory_member = dormitory.members[member];
                if (!dormitory_member.visited) {
                    dormitory_member.dormintory = dormitory.name;
                    re.randoms[k] = dormitory_member;
                    dormitory.members[member].visited = true;
                    break;
                }
            }
        }

    }, error: function (error) {
        console.log(error);
        location.replace("./api/index.json");
    },
    async: false
});

window.onload = function () {
    Vue.createApp({
        data: function () {
            return re;
        }
    }).mount("#vm");
    let py = $(document).scrollTop();
    $(window).scroll(function () {
        if(($(document).scrollTop() > $("#title").height()))
        {
            if(($(document).scrollTop()-py)<-10){
                $("#nav_bar").removeClass("nav_invisible").addClass("nav_visible");}
            if(($(document).scrollTop()-py)>10){
                $("#nav_bar").removeClass("nav_visible").addClass("nav_invisible");
            }
        }else{
            $("#nav_bar").removeClass("nav_visible").addClass("nav_invisible");
        }
        py = $(document).scrollTop();
    });
}


function rnd(seed) {
    const d = new Date();
    seed = d.getFullYear() * 8928 + d.getMonth() * 744 + d.getDate()*24 + d.getHours()*9 + seed*7;
    seed = (seed * 9301 + 49297) % 233280;
    seed = Math.ceil(seed%10000 + seed/10000);
    seed = (seed * 9301 + 49297) % 233280;2
    return seed;
}