//API实时
window.onload = () => {
    carry("重庆");
}
function pull(location) {
    document.getElementById(location).style.display = "block";
}
let btntxt = document.getElementById("city-name");
let hot_city = document.getElementsByClassName("hot-city-item");
let weather;
let weather_week;
let comfort,hourly;

btntxt.addEventListener('keydown', () => {
    if (event.keyCode == 13) {
        let city_name = document.getElementById("city-name").value;
        carry(city_name);
    }
   
});
        function hot(city_name)
        {
            carry(city_name);
        }

        function carry(city_name) {
            ajax(city_name); 
            ajax_week(city_name);
            ajax_comfort(city_name);
            ajax_hourly(city_name);
            place(city_name);
            pushback();
            history(city_name);
           
            }
        
        function ajax(city_name)
        {
            
            const xhr=new XMLHttpRequest();
            xhr.open("GET","https://tianqiapi.com/free/day?appid=49114279&appsecret=MgKY7M9T&city="+city_name,true);
            xhr.send()
                                                                                                                                                                                                                                                                           
            xhr.onreadystatechange = function()
            {
                if(xhr.readyState==4)
                {
                    if(xhr.status==200)
                    {
                        weather = JSON.parse(xhr.responseText);
                        console.log(weather);
                        distri();
                        
                        console.log('请求成功');
                    }
                    else console.log('请求失败');
                }
            }
        }
        function pushback() {
            document.getElementById("sec-location").style.display = "none";       
        }
        
        function history(city_name) {
            let new_his = document.createElement("div");
            new_his.innerHTML = city_name;
            let div = document.getElementById("history");
            div.appendChild(new_his);
            
            }
                
        function place(city_name) {
            document.getElementById("location").innerHTML = city_name;
        }
                
// 分配数据
function distri() {
    let wea_num = document.getElementById("weather");//温度
    let main_img = document.getElementById("sec-main");//背景图
    let win = document.getElementById("wind-humi-top");//风
    let win_speed = document.getElementById("wind-humi-bot");//风的级数
    
    
    wea_num.innerHTML = weather["tem"]+"&#176";
    win.innerHTML = weather["win"];
    win_speed = weather["win_speed"];
    sec_main_img(main_img, weather); 
}
 
function sec_main_img(main_img) {
    switch (weather["wea"]) {
        case "晴": main_img.style.background = "url(weather-background/qing.jpg)"; num_sty();break;
        case "雪":main_img.style.background = "url(weather-background/xue.jpg)"; break;
        case "沙尘":main_img.style.background = "url(weather-background/shachen.jpg)"; break;
        case "雾":main_img.style.background = "url(weather-background/wu.jpg)"; break;
        case "冰雹":main_img.style.background = "url(weather-background/bingbao.jpg)"; break;
        case "云":main_img.style.background = "url(weather-background/yun.jpg)"; break;
        case "雨":main_img.style.background = "url(weather-background/yu.jpg)"; break;
        case "阴":main_img.style.background = "url(weather-background/yin.jpg)"; break;
        default: break;
    }
}
function num_sty() {
    let wea_num = document.getElementById("weather");//温度
    let win = document.getElementById("wind-humi-top");//风
    let win_speed = document.getElementById("wind-humi-bot");//风的级数
    wea_num.style.color = "black";
    win.style.color = "black";
    win_speed.style.color = "black";
}

// 七天天气API
function ajax_week(city_name)
{
    
    const xhr=new XMLHttpRequest();
    xhr.open("GET","https://www.tianqiapi.com/free/week?appid=49114279&appsecret=MgKY7M9T&city="+city_name,true);
    xhr.send()
                                                                                                                                                                                                                                                                   
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200)
            {
                weather_week = JSON.parse(xhr.responseText);
                console.log(weather_week);
                week_distribute(weather_week);
                //7 day
                highLowTem();
                
                console.log('请求成功');
            }
            else console.log('请求失败');
        }
    }
}

// sec-tomorrow
function week_distribute(weather_week) {
    console.log(weather);
    let tomo_item_top_left = document.getElementsByClassName('tomo-item-top-left');
    let tomo_item_top_right = document.getElementsByClassName('tomo-item-top-right');
    
    let tomo_item_bot_left = document.getElementsByClassName('tomo-item-bot-left');
    let tomo_item_bot_right = document.getElementsByClassName('tomo-item-bot-right');
    
    tomo_item_top_left[0].innerHTML = "今天";
    tomo_item_top_left[1].innerHTML = "明天";
    
    let du1 = weather["tem_day"] + "/" + weather["tem_night"] + "&#176";
    
    let du2 = weather_week["data"][0]["tem_day"] + "/" + weather_week["data"][0]["tem_night"] + "&#176";
    tomo_item_top_right[0].innerHTML = du1;
    tomo_item_top_right[1].innerHTML = du2;

    tomo_item_bot_left[0].innerHTML = weather["wea"];
    tomo_item_bot_left[1].innerHTML = weather_week["data"][0]["wea"];

    to_img(weather_week , tomo_item_bot_right);
}
function to_img( weather_week, tomo_item_bot_right) {
    switch (weather["wea"]) {
        case "晴": tomo_item_bot_right[0].src = "imgs/sun.png"; break;
        case "雪":tomo_item_bot_right[0].src = "imgs/snow.png"; break;
        case "沙尘":tomo_item_bot_right[0].src = "imgs/shachen.png"; break;
        case "雾":tomo_item_bot_right[0].src = "imgs/fog.png"; break;
        case "冰雹":tomo_item_bot_right[0].src = "imgs/bingbao.png"; break;
        case "云":tomo_item_bot_right[0].src = "imgs/cloudy.png"; break;
        case "雨":tomo_item_bot_right[0].src = "imgs/rain.png"; break;
        case "阴":tomo_item_bot_right[0].src = "imgs/yintian.png"; break;
        default: break;
    }
    switch (weather_week["data"][0]["wea"]) {
        case "晴": tomo_item_bot_right[1].src = "imgs/sun.png"; break;
        case "雪":tomo_item_bot_right[1].src = "imgs/snow.png"; break;
        case "沙尘":tomo_item_bot_right[1].src = "imgs/shachen.png"; break;
        case "雾":tomo_item_bot_right[1].src = "imgs/fog.png"; break;
        case "冰雹":tomo_item_bot_right[1].src = "imgs/bingbao.png"; break;
        case "云":tomo_item_bot_right[1].src = "imgs/cloudy.png"; break;
        case "雨":tomo_item_bot_right[1].src = "imgs/rain.png"; break;
        case "阴":tomo_item_bot_right[1].src = "imgs/yintian.png"; break;
        default: break;
    }
}

let high_tem = [];
let low_tem = [];



// 图表
window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var weekLable= new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");  

let  timelable=[];
var day1 = new Date();
for(i=0;i<7;i++){
  
  if (i==0){
  timelable[i] ='今天';
  }else if (i==1){
   timelable[i] ='明天';
  }else if (i==2){
   timelable[i] ='后天';
  }else{
      timelable[i]=weekLable[day1.getDay()];
  }
  
  day1.setDate(day1.getDate() +1);
  
}
var lineChartData = {
			labels: timelable,
			datasets: [{
				label: '最高温度',
				borderColor:window.chartColors.red ,
				backgroundColor: window.chartColors.red,
				fill: false,
				data: high_tem
				
			}, {
				label: '最低温度',
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
				fill: false,
				data: low_tem
			}]
};


var ctx = document.getElementById('myChart').getContext('2d');
window.myLine = Chart.Line(ctx, {
	data: lineChartData,
	options: {
				responsive: true,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Value'
						}
					}]
				}
	    }
});


//update 7day
function highLowTem() {

    let weatheritems= weather_week["data"]

    for (let i in weatheritems) {
        low_tem[i] = parseInt(weather_week["data"][i]["tem_day"]);
        high_tem[i] = parseInt(weather_week["data"][i]["tem_night"]);
    }
    window.myLine.update();
}

// 生活指数
function ajax_comfort(city_name)
{
    
    const xhr=new XMLHttpRequest();
    xhr.open("GET","https://api.heweather.net/s6/weather/lifestyle?location="+city_name+"&key=560288961371441eb21133de57313c42",true);
    xhr.send()
                                                                                                                                                                                                                                                                   
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200)
            {
                comfort = JSON.parse(xhr.responseText);
                console.log(comfort);
                comfort_distribute();
                console.log('请求成功');
            }
            else console.log('请求失败');
        }
    }
}
function comfort_distribute() {
    let type = document.getElementsByClassName("living-item-we");
    let living_item_top = document.getElementsByClassName("living-item-top");
    let living_item_bot = document.getElementsByClassName("living-item-bot");
    let comfortLength = comfort["HeWeather6"][0]["lifestyle"];
    for (let i = 0; comfortLength!=undefined  && i<8;i++) {
        type[i].src = comfort_img(comfort["HeWeather6"][0]["lifestyle"][i]["type"]);
        living_item_top[i].innerHTML = comfort["HeWeather6"][0]["lifestyle"][i]["brf"];
        living_item_bot[i].innerHTML = comfort["HeWeather6"][0]["lifestyle"][i]["brf"];
    }
}
function comfort_img(type) {
    switch (type) {
        case "comf": return "imgs/comfort.png"; break;
        case "cw": return "imgs/car-1.png"; break;
        case "drsg": return "imgs/cloth.png"; break;
        case "flu": return "imgs/medicine.png"; break;
        case "sport": return "imgs/sports.png"; break;
        case "trav": return "imgs/travel.png"; break;
        case "uv": return "imgs/light.png"; break;
        case "air": return "imgs/air-middle.png"; break;
        default: break;
    }
}

// 逐小时报告
function ajax_hourly(city_name)
{
    
    const xhr=new XMLHttpRequest();
    xhr.open("GET","https://api.heweather.net/s6/weather/hourly?location="+city_name+"&key=560288961371441eb21133de57313c42",true);
    xhr.send()
                                                                                                                                                                                                                                                                   
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200)
            {
                hourly= JSON.parse(xhr.responseText);
                console.log(hourly);
                hourly_distribute();
                console.log('请求成功');
            }
            else console.log('请求失败');
        }
    }
}
function hourly_distribute() {
    let we_item_top = document.getElementsByClassName("we-item-top");
    let hours_img = document.getElementsByClassName("hours-img");
    let we_item_bot = document.getElementsByClassName("we-item-bot");
    
    for (let i = 0; i < 24; i++)
    {
        we_item_top[i].innerHTML = hourly["HeWeather6"][0]["hourly"][i]["time"];
        hours_img[i].src = hourly_img(hourly["HeWeather6"][0]["hourly"][i]["cond_code"]);
        we_item_bot[i].innerHTML=hourly["HeWeather6"][0]["hourly"][i]["tmp"];
        }

}
function hourly_img(type) {
    switch (type) {
        case "100": return "imgs/100.png"; break;
        case "101": return "imgs/101.png"; break;
        case "103": return "imgs/103.png"; break;
        case "104": return "imgs/104.png"; break;
        case "200": return "imgs/200.png"; break;
        case "201": return "imgs/201.png"; break;
        case "205": return "imgs/205.png"; break;
        case "209": return "imgs/209.png"; break;
        case "211": return "imgs/211.png"; break;
        case "300": return "imgs/300.png"; break;
        case "302": return "imgs/302.png"; break;
        case "305": return "imgs/305.png"; break;
        case "306": return "imgs/306.png"; break;
        case "307": return "imgs/307.png"; break;
        case "308": return "imgs/308.png"; break;
        case "309": return "imgs/309.png"; break;
        case "310": return "imgs/310.png"; break;
        case "311": return "imgs/311.png"; break;
        case "312": return "imgs/312.png"; break;
        case "314": return "imgs/314.png"; break;
        case "315": return "imgs/315.png"; break;
        case "316": return "imgs/316.png"; break;
        case "317": return "imgs/317.png"; break;
        case "318": return "imgs/318.png"; break;
        case "399": return "imgs/399.png"; break;
        case "400": return "imgs/400.png"; break;
        case "401": return "imgs/401.png"; break;
        case "402": return "imgs/402.png"; break;
        case "403": return "imgs/403.png"; break;
        case "404": return "imgs/404.png"; break;
        case "405": return "imgs/405.png"; break;
        case "406": return "imgs/406.png"; break;
        case "408": return "imgs/408.png"; break;
        case "499": return "imgs/499.png"; break;
        case "500": return "imgs/500.png"; break;
        case "501": return "imgs/501.png"; break;
        case "502": return "imgs/502.png"; break;
        case "503": return "imgs/503.png"; break;
        case "507": return "imgs/507.png"; break;
        case "509": return "imgs/509.png"; break;
        case "510": return "imgs/510.png"; break;
        case "511": return "imgs/511.png"; break;
        case "512": return "imgs/512.png"; break;
        case "513": return "imgs/513.png"; break;
        case "514": return "imgs/514.png"; break;
        case "900": return "imgs/900.png"; break;
        case "901": return "imgs/901.png"; break;
        case "999": return "imgs/999.png"; break;
        default: break;

    }
}

// let mouseDownX,mouseDownY,initX,initY,flag=false;  
//  function hours_1(e){
//     let hour_obj=document.getElementById("hours");
//     // 鼠标按下时的X,Y坐标（可能有误）
//     mouseDownX=e.clientX;
//     mouseDownY=e.clientY;

//     //初始位置的X，Y 坐标  
//     initX = hour_obj.offsetLeft  
//     initY = hour_obj.offsetTop;  

//     // 确保鼠标以按下
//     flag=true;
// }

//  function hours_2(e){
//     if(flag){
//         let hour_obj=document.getElementById("map");
//         let mouseMoveX = e.clientX,mouseMoveY = e.clientY;  
//         hour_obj.style.left = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX) + "px";  
//         // map_obj.style.top = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY) + "px";  
//     }
// }
// function hours_3(e){
//     flag=false;
// }

