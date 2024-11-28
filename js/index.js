let re;

$.ajax({
    url: "./api/index.json", dataType: 'json',
    success: function (result) {
        re = $.parseJSON(JSON.stringify(result));
    }, error: function (error) {
        console.log(error);
        location.replace("./api/index.json");
    },
    async: false
});

window.onload = function () {
    Vue.createApp({
        data: function (){
            return re;
        }
    }).mount("#vm");
}