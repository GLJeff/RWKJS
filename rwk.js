<!--
function httpspath()
{
pathURL = window.location + '';
pathDir = pathURL.lastIndexOf ('/', pathURL.length);
pathBase = pathURL.substring (0, pathDir + 1);
return pathBase.replace("http","http");
}

var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.post = function (url, data, callback, async) {
	//console.log("sending: " + data);
    ajax.send(url, callback, 'POST', data, async)
};

function GotActionData(data)
{

	//Report("GOTDATA CALL");
	//Report("status: " + status + " and jq: " + objToString(jqXHR));

	/*if(jqXHR.MyRnd != HTTP.rnd)
	{
		Report("Rnd no match, ignored.");//yes completely ignore it, dont do anything else
		return;
	}*/

	if(data)
	{
		//console.log("gotraw: " + data);
		data = data.substring(data.indexOf("<script>up(")+12,data.indexOf(")</script>")-1);
		//console.log("got: " + data);
		up(data);

		//Report("unable to verify: " + tdata);
	}
	else
	{
		//console.log("failed gotactiondata");
	}

	//Report("nonsuccess GotData: " + status + " and jq: " + objToString(jqXHR));
}

function GotPollData(data)
{

	//Report("GOTDATA CALL");
	//Report("status: " + status + " and jq: " + objToString(jqXHR));

	/*if(jqXHR.MyRnd != HTTP.rnd)
	{
		Report("Rnd no match, ignored.");//yes completely ignore it, dont do anything else
		return;
	}*/

	if(data)
	{
		//console.log("gotraw: " + data);
		data = data.substring(data.indexOf("<script>up(")+12,data.indexOf(")</script>")-1);
		//console.log("got: " + data);
		up(data ,"poll");

		//Report("unable to verify: " + tdata);
	}
	else
	{
		//console.log("failed gotpolldata");
	}

	//Report("nonsuccess GotData: " + status + " and jq: " + objToString(jqXHR));
}
function dopoll(timeallow)
{
	top.pollcount++;
	if(top.pollcount > 60*2*60)
		timeallow *= 10;
	else if(top.pollcount > 60*2*15)
		timeallow *= 2;
	var curtime = new Date().getTime();
	if(top.Update==1 || curtime < top.LastPoll + timeallow)
		return;

	//top.LastAction="poll";
	top.LastPoll = curtime;

	var pollerstr = "";
    var elements = document.getElementById("poller").elements;
    for(var i = 0 ; i < elements.length ; i++)
	{
        var item = elements.item(i);
        pollerstr += encodeURIComponent(item.name).replace(/%20/g, "+") + "=" + encodeURIComponent(item.value).replace(/%20/g, "+") + "&";
    }

//<tr><form action="+httpspath()+"rw.cgi target=poll2 method=POST name=poller id=poller><td colspan=3 bgcolor=0><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=action value=\"poll\"><input type=hidden name=target value=\"none\"><input type=hidden name=other value=\"none\"><input type=hidden name=othera value=\"none\"><input type=hidden name=otherb value=\"none\"></td></form></tr>\

//poller.submit();
		//var jqXHR = $.ajax({
		//	  type: "POST",
		//	  url: httpspath() + "rw.cgi",
		//	  data: pollerstr,
		//	  complete: GotPollData,
		//	  //success: GotSucc,
		//	  //dataFilter: MyFilt,
		//	  dataType: "text",
		//	  mimeType: "text/plain",
		//	  //xhrFields: {withCredentials: false},
		//	  processData: false,
		//	  timeout: RESENDFREQUENCY-500//millis
		//	});
	ajax.post(httpspath() + "rw.cgi", pollerstr, GotPollData, true);

}
function IEVER()
{
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 999;
}
function HideAd()
{
top.frames.main.s_Banner.innerHTML="";
}
function getdigit(bignm, dig)
{
	anl = parseInt(bignm,10)/(Math.pow(10,dig));
	return Math.floor(anl)%10;
}
function processfight(fvar, reverse)
{
fightvar=fvar.split("_");
if(!reverse && fightvar[0] != null)
{
temptar = fightvar[0].split("~");
top.Target=ms(temptar[0]);
Eminy=temptar[0];
top.TargetRaceSex=temptar[1];
if(!top.GraphicMode)
	upwindow(0);
}
else if(fightvar[0] != null)
{
temptar = fightvar[0].split("~");
Eminy=temptar[0];
}
else
{
domes("figtstrerr32324");
return;
}
for(i=0;i < fightvar.length;i++)
{
if((fightvar[i]=="k" && !reverse) || (fightvar[i]=="r" && reverse))
{
	if(!reverse)
	{
		upfight(33+reverse+"<"+"You have slain <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>!"+"|");
	}
	else
		upfight(33+reverse+"<"+"You have slain <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a> in your counter attack!"+"|");
	if(Eminy==top.Target)
	{
		top.TargetHealth=0;
		top.Target=-1;
		if(!top.GraphicMode)
			upwindow(1);
	}
	break;
}
else if(fightvar[i]=="d")
{
	if(!reverse)
	{
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" already slain by another player."+"|");
	}
	else
		domes("d fightstring err32423");
	if(Eminy==top.Target)
	{
		top.TargetHealth=0;
		top.Target=-1;
		if(!top.GraphicMode)
			upwindow(1);
	}
	break;
}
else if((fightvar[i]=="r" && !reverse) || (fightvar[i]=="k" && reverse))
{
	if(!reverse)
	{
		upfight(33+reverse+"<"+"You have been slain in your attack on <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>!"+"|");
		if(fightvar[i+1]!="")
			top.TargetHealth=fightvar[i+1];
	}
	else
	{
		upfight(33+reverse+"<"+"You have been slain by <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>!"+"|");
		domes("You have been slain by <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>!");
	}
	break;
}
else if(fightvar[i]=="i")
{
	break;
}
else if((i==1 || i==16) && !reverse)
{
	if(fightvar[i]!="")
		top.TargetHealth=fightvar[i];
}
else if(top.NoBattle)
{
}
else if((i==2 && !reverse) || (i==3 && reverse))
{
	tempfvar=fightvar[i].split("!");
	fightvar[i]=tempfvar[0];
	mescode = parseInt((fightvar[i])%10,10);
	annuls = parseInt((fightvar[i]/10)%100,10);
	voidcode = parseInt((fightvar[i]/10000)%10,10);
	evoidcode = parseInt((fightvar[i]/1000)%10,10);
	if(reverse)
	{
		voidcode = 0;
		evoidcode = 0;
	}
	if(evoidcode==3)
		upfight(33+reverse+"<"+"<font color=#7777FF>You resist a possible void or devoid!</font>|");
	if(voidcode==3)
		upfight(33+reverse+"<"+"<font color=#7777FF>Your enemy resists a possible void or devoid!</font>|");
	if(voidcode==2)
		upfight(33+reverse+"<"+"<font color=#7777FF>You void your foe's relics!</font>|");
	if(voidcode==1)
		upfight(33+reverse+"<"+"<font color=#7777FF>You devoid your foe's relics!</font>|");
	if(fightvar[i]=="")
	{
	}
	else if(evoidcode==2)
	{
		upfight(33+reverse+"<"+"<font color=#7777FF>Your relics are voided!</font>|");
	}
	else if(evoidcode==1)
	{
		upfight(33+reverse+"<"+"<font color=#7777FF>Your relics are devoided!</font>|");
	}
	else
	{

	if(annuls==0)
		upfight(33+reverse+"<"+"<font color=#7777FF>Your relics shimmer in the presence of <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a></font>|");
	else
		upfight(33+reverse+"<"+"<font color=#7777FF>Your relics shimmer but "+annuls+" are annulled by <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a></font>|");
	if(mescode==1 || mescode==3 || mescode==5 || mescode==9)
		upfight(33+reverse+"<"+"<font color=#7777FF>You mesmerize <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+"</font>|");

	relicaddition="";
	if(mescode==2 || mescode==3)
		relicaddition = "<font color=#AAAAAA>EUPHORIC RUSH!</font>";
	if(mescode==4 || mescode==5)
		relicaddition = "<font color=#AAAAAA>EUPHORIC SURGE!!!</font>";
	if(mescode==8 || mescode==9)
		relicaddition = "<font color=#AAAAAA>EUPHORIC OBLITERATION!!!</font>";
	
	if(top.RelicMode==0)
	{
		allench = [top.Ench1,top.Ench2,top.Ench3,top.Ench4,top.Ench5,top.Ench6,top.Ench7,top.Ench8,top.Ench9,top.Ench10,parseInt(top.Weapon/100000,10)-1,parseInt(top.Helmet/100000,10)-1,parseInt(top.Shield/100000,10)-1,parseInt(top.Gauntlets/100000,10)-1,parseInt(top.Mantle/100000,10)-1,parseInt(top.Sleeves/100000,10)-1,parseInt(top.Cast/100000,10)-1,parseInt(top.Leggings/100000,10)-1,parseInt(top.Boots/100000,10)-1,parseInt(top.Heal/100000,10)-1,top.Relic1%1000,top.Relic2%1000,top.Relic3%1000,top.Relic4%1000,top.Relic5%1000,top.Relic6%1000];
		blehq = [];
		jj = 0;
		for(m = 0;m < 26;m++)
		{
			if(allench[m]==24)
			{
				blehq[jj]=m;
				jj++;
				allench[m]=-1;
			}
		}
		allench[blehq[parseInt(Math.random()*10000,10)%jj]]=24;
		offseter = 0;
		for(m = 0;m < 26;m++)
		{
			if((allench[m]!=-1 && m >= annuls+offseter) || allench[m]>=32 || allench[m]==26)
			{
				if(allench[m]==24 && mescode==0)
					continue;
				if(fightvar[i+1-(reverse*2)]!="k" && fightvar[i+1-(reverse*2)]!="d" && fightvar[i+1-(reverse*2)]!="i" && fightvar[i+1-(reverse*2)]!="r")
					upfight(33+reverse+"<"+"<font color=#7777FF>Your "+getplacemes(m)+"..."+getrelicmes(allench[m],fightvar[i+1-(reverse*2)]/10)+"</font>|");
				else
					upfight(33+reverse+"<"+"<font color=#7777FF>Your "+getplacemes(m)+"..."+getrelicmes(allench[m],0)+"</font>|");
			}
			if((allench[m]>=32 || allench[m]==26) && m < annuls+offseter)offseter++;
		}
	}
	if(tempfvar[1] && tempfvar[1]!="0")
		upfight(33+reverse+"<"+"<font color=#FF0000>You deal "+mc(tempfvar[1])+" in relic damage.</font> "+relicaddition+"|");
	}
}
else if((i==3 && !reverse) || (i==2 && reverse))
{
	tempfvar=fightvar[i].split("!");
	fightvar[i]=tempfvar[0];
	mescode = parseInt((fightvar[i])%10,10);
	annuls = parseInt((fightvar[i]/10)%100,10);
	evoidcode = parseInt((fightvar[i]/10000)%10,10);
	voidcode = parseInt((fightvar[i]/1000)%10,10);
	if(!reverse)
	{
		voidcode = 0;
		evoidcode = 0;
	}
	if(evoidcode==3)
		upfight(33+reverse+"<"+"<font color=#7777FF>You resist a possible void or devoid!</font>|");
	if(voidcode==3)
		upfight(33+reverse+"<"+"<font color=#7777FF>Your enemy resists a possible void or devoid!</font>|");
	if(voidcode==2)
		upfight(33+reverse+"<"+"<font color=#7777FF>You void your foe's relics!</font>|");
	if(voidcode==1)
		upfight(33+reverse+"<"+"<font color=#7777FF>You devoid your foe's relics!</font>|");
	if(fightvar[i]=="")
	{
	}
	else if(evoidcode==2)
	{
		upfight(33+reverse+"<"+"<font color=#7777FF>Your relics are voided!</font>|");
	}
	else if(evoidcode==1)
	{
		upfight(33+reverse+"<"+"<font color=#7777FF>Your relics are devoided!</font>|");
	}
	else
	{

	if(annuls==0)
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#7777FF>'s relics shimmer.</font>|");
	else
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#7777FF>'s relics shimmer, but you annul "+annuls+" of them.</font>|");
	if(mescode==1 || mescode==3 || mescode==5 || mescode==9)
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#7777FF> mesmerizes you.</font>|");
	relicaddition = "";
	if(mescode==2 || mescode==3)
		relicaddition = "<font color=#AAAAAA>EUPHORIC RUSH!</font>";
	if(mescode==4 || mescode==5)
		relicaddition = "<font color=#AAAAAA>EUPHORIC SURGE!!!</font>";
	if(mescode==8 || mescode==9)
		relicaddition = "<font color=#AAAAAA>EUPHORIC OBLITERATION!!!</font>";
	if(tempfvar[1] && tempfvar[1]!="0")
		upfight(33+reverse+"<"+"<font color=#FF0000>Enemy deals "+mc(tempfvar[1])+" in relic damage.</font>"+relicaddition+"|");
	}
}
else if(((i==4 || i==7) && !reverse) || ((i==10 || i==13) && reverse))
{
	xtrafight="";
	if(fightvar[i].charAt(0)=="a")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>DEVASTATING BLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="b")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>CRIPPLING BLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="c")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>ENEMY STUNNED!</font>";
	}
	else if(fightvar[i].charAt(0)=="e")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>ENRAGED STRIKE!</font>";
	}
	else if(fightvar[i].charAt(0)=="f")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>PRECISE SHOT!</font>";
	}
	if(fightvar[i]=="0")
		upfight(33+reverse+"<"+"<font color=#FF2222>You miss <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a></font>|");
	else if(fightvar[i]=="s")
		upfight(33+reverse+"<"+"<font color=#FF2222>Your attack was blocked by <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>'s shield.</font>|");
	else if(fightvar[i]=="w")
		upfight(33+reverse+"<"+"<font color=#FF2222>Your attack was dodged by <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>.</font>|");
	else if(fightvar[i]!="")
		upfight(33+reverse+"<"+"<font color=#FF2222>You hit <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a> for "+mc(fightvar[i])+"</font>"+xtrafight+"|");
}
else if(((i==5 || i==8) && !reverse) || ((i==11 || i==14) && reverse))
{
	xtrafight="";
	if(fightvar[i].charAt(0)=="a")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA RUSH!</font>";
	}
	else if(fightvar[i].charAt(0)=="b")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA SURGE!</font>";
	}
	else if(fightvar[i].charAt(0)=="e")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA FLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="f")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>THEURGAL REPRISE!</font>";
	}
	if(fightvar[i]=="0")
		upfight(33+reverse+"<"+"<font color=#00FF00>Your heal fizzled"+"</font>|");
	else if(fightvar[i]!="")
		upfight(33+reverse+"<"+"<font color=#00FF00>You heal for "+mc(fightvar[i])+"</font>"+xtrafight+"|");
}
else if(((i==6 || i==9) && !reverse) || ((i==12 || i==15) && reverse))
{
	xtrafight="";
	if(fightvar[i].charAt(0)=="a")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA RUSH!</font>";
	}
	else if(fightvar[i].charAt(0)=="b")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA SURGE!</font>";
	}
	else if(fightvar[i].charAt(0)=="e")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA FLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="f")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>THEURGAL REPRISE!</font>";
	}
	if(fightvar[i]=="0")
		upfight(33+reverse+"<"+"<font color=#FF2222>Your cast fizzled"+"</font>|");
	else if(fightvar[i]=="s")
		upfight(33+reverse+"<"+"<font color=#FF2222>Your cast was reflected by <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>'s shield.</font>|");
	else if(fightvar[i]!="")
		upfight(33+reverse+"<"+"<font color=#FF2222>You cast on <a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a> for "+mc(fightvar[i])+"</font>"+xtrafight+"|");
}
else if(((i==10 || i==13) && !reverse) || ((i==4 || i==7) && reverse))
{
	xtrafight="";
	if(fightvar[i].charAt(0)=="a")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>DEVASTATING BLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="b")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>CRIPPLING BLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="c")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>YOU ARE STUNNED!</font>";
	}
	else if(fightvar[i].charAt(0)=="e")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>ENRAGED STRIKE!</font>";
	}
	else if(fightvar[i].charAt(0)=="f")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>PRECISE SHOT!</font>";
	}
	if(fightvar[i]=="0")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>misses."+"</font>|");
	else if(fightvar[i]=="s")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>'s attack was blocked by your shield."+"</font>|");
	else if(fightvar[i]=="w")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>'s attack was easily dodged."+"</font>|");
	else if(fightvar[i]!="")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>hits you for "+mc(fightvar[i])+"</font>"+xtrafight+"|");
}
else if(((i==11 || i==14) && !reverse) || ((i==5 || i==8) && reverse))
{
	xtrafight="";
	if(fightvar[i].charAt(0)=="a")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA RUSH!</font>";
	}
	else if(fightvar[i].charAt(0)=="b")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA SURGE!</font>";
	}
	else if(fightvar[i].charAt(0)=="e")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA FLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="f")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>THEURGAL REPRISE!</font>";
	}
	if(fightvar[i]=="0")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#00FF00>'s heal fizzled"+"</font>|");
	else if(fightvar[i]!="")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#00FF00>heals for "+mc(fightvar[i])+"</font>"+xtrafight+"|");
}
else if(((i==12 || i==15) && !reverse) || ((i==6 || i==9) && reverse))
{
	xtrafight="";
	if(fightvar[i].charAt(0)=="a")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA RUSH!</font>";
	}
	else if(fightvar[i].charAt(0)=="b")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA SURGE!</font>";
	}
	else if(fightvar[i].charAt(0)=="e")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>MANA FLOW!</font>";
	}
	else if(fightvar[i].charAt(0)=="f")
	{
		fightvar[i]=fightvar[i].substring(1,fightvar[i].length);
		xtrafight=" <font color=#AAAAAA>THEURGAL REPRISE!</font>";
	}
	if(fightvar[i]=="0")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>fizzled"+"</font>|");
	else if(fightvar[i]=="s")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>'s cast was reflected by your shield."+"</font>|");
	else if(fightvar[i]!="")
		upfight(33+reverse+"<"+"<a href=javascript:tg('"+Eminy+"')>"+getcreature(Eminy)+"</a>"+" <font color=#FF2222>casts for "+mc(fightvar[i])+"</font>"+xtrafight+"|");
}
}
upbars();
}
function upbars()
{
HPerc=parseInt(top.Health/top.Dur*100,10);
health=mc(top.Health);

t=parseInt(HPerc*14/100,10)-(6-health.length/2);
if(t)
HLeft=health.substring(0,t);
else
HLeft="";
if(t<health.length)
HRight=health.substring(t,health.length);
else
HRight="";

tempstr="<table border=0 width=100% cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=30 width=22 src='"+top.y+"ml.jpg'></td><td width="+HPerc+" background='"+top.y+"mf";
if(HPerc > 20)
tempstr+="g";
tempstr+=".jpg' align=right><a href=../info.htm#health target=_blank><font color=#FFFFFF>"+HLeft+"</font></a></td><td width="+(100-HPerc)+" background='"+top.y+"me.jpg'><a href=../info.htm#health target=_blank><font color=#FFFFFF>"+HRight+"</font></a></td><td width=0 bgcolor=0><img border=0 height=30 width=22 src='"+top.y+"mr.jpg'></td></tr></table>";
top.frames.main.s_LifeMeter.innerHTML=tempstr;

HPerc=top.TargetHealth;
tempstr="<table border=0 width=100% cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=30 width=22 src='"+top.y+"ml.jpg'></td><td width="+HPerc+" background='"+top.y+"mf";
if(HPerc > 20)
tempstr+="g";
tempstr+=".jpg' align=right></td><td width="+(100-HPerc)+" background='"+top.y+"me.jpg'></td><td width=0 bgcolor=0><img border=0 height=30 width=22 src='"+top.y+"mr.jpg'></td></tr></table>";
top.frames.main.s_TargetMeter.innerHTML=tempstr;
}
function adly(rank, witti, daxsize, daysize, alterit)
{
if(witti==0 || top.Animation==1)
return "";
if(witti==1)
	picstrin="fire.gif";
else if(witti==2)
	picstrin="lightning.gif";
else if(witti==3)
	picstrin="snow.gif";
else if(witti==4)
	picstrin="flame.gif";
else if(witti==5)
	picstrin="storm.gif";
else if(witti==6)
	picstrin="shards.gif";
else if(witti==7)
{
	picstrin="ruby.jpg";
	alterit += " Ruby r" + rank;
}
else if(witti==8)
{
	picstrin="sapphire.jpg";
	alterit += " Sapphire r" + rank;
}
else if(witti==9)
{
	picstrin="emerald.jpg";
	alterit += " Emerald r" + rank;
}
else return "";
habyret = "<div id=DM STYLE='opacity:0.5;position:absolute;filter:alpha(opacity:50);'><img title='"+alterit+"' src='"+top.y+""+picstrin+"' height="+daysize+" width="+daxsize+"></div>";
return habyret;
}
function upwindow(mode)
{
if(mode==1)
{
top.WindowMode=mode;
tempstr="";
tempstr+="<table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>";
tempstr+="<tr>";
tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
tempstr+="<td background='"+top.y+"top.jpg' align=center colspan=6><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>";
tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td background='"+top.y+"side.jpg' rowspan=6><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank1,top.Mnch1,48,48,getitem(top.Weapon))+"<img title=\""+getitem(top.Weapon)+"\" border=0 src='"+top.y+""+top.WeaponPic+"' width=48 height=48></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank2,top.Mnch2,48,48,getitem(top.Helmet))+"<img title=\""+getitem(top.Helmet)+"\" border=0 src='"+top.y+""+top.HelmetPic+"' width=48 height=48></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank3,top.Mnch3,48,48,getitem(top.Shield))+"<img title=\""+getitem(top.Shield)+"\" border=0 src='"+top.y+""+top.ShieldPic+"' width=48 height=48></td>";
tempstr+="<td background='"+top.y+"side.jpg' rowspan=6><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank4,top.Mnch4,48,48,getitem(top.Gauntlets))+"<img title=\""+getitem(top.Gauntlets)+"\" border=0 src='"+top.y+""+top.GauntletsPic+"' width=48 height=48></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank5,top.Mnch5,48,48,getitem(top.Mantle))+"<img title=\""+getitem(top.Mantle)+"\" border=0 src='"+top.y+""+top.MantlePic+"' width=48 height=48></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank6,top.Mnch6,48,48,getitem(top.Sleeves))+"<img title=\""+getitem(top.Sleeves)+"\" border=0 src='"+top.y+""+top.SleevesPic+"' width=48 height=48></td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td width=0 bgcolor=0 height=0>"+adly(top.MnchRank7,top.Mnch7,24,48,getitem(top.Cast))+"<img title=\""+getitem(top.Cast)+"\" border=0 src='"+top.y+""+top.CastPic+"' width=24 height=48></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank8,top.Mnch8,48,48,getitem(top.Leggings))+"<img title=\""+getitem(top.Leggings)+"\" border=0 src='"+top.y+""+top.LeggingsPic+"' width=48 height=48></td>";
tempstr+="<td width=0 bgcolor=0 colspan=2 height=0>"+adly(top.MnchRank9,top.Mnch9,48,48,getitem(top.Boots))+"<img title=\""+getitem(top.Boots)+"\" border=0 src='"+top.y+""+top.BootsPic+"' width=48 height=48></td>";
tempstr+="<td width=0 bgcolor=0 height=0>"+adly(top.MnchRank10,top.Mnch10,24,48,getitem(top.Heal))+"<img title=\""+getitem(top.Heal)+"\" border=0 src='"+top.y+""+top.HealPic+"' width=24 height=48></td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td width=0 bgcolor=0 height=0><img title=\""+getitem(top.Relic1)+"\" border=0 src='"+top.y+""+top.Relic1Pic+"' width=24 height=24></td>";
tempstr+="<td width=0 bgcolor=0 height=0><img title=\""+getitem(top.Relic2)+"\" border=0 src='"+top.y+""+top.Relic2Pic+"' width=24 height=24></td>";
tempstr+="<td width=0 bgcolor=0 height=0><img title=\""+getitem(top.Relic3)+"\" border=0 src='"+top.y+""+top.Relic3Pic+"' width=24 height=24></td>";
tempstr+="<td width=0 bgcolor=0 height=0><img title=\""+getitem(top.Relic4)+"\" border=0 src='"+top.y+""+top.Relic4Pic+"' width=24 height=24></td>";
tempstr+="<td width=0 bgcolor=0 height=0><img title=\""+getitem(top.Relic5)+"\" border=0 src='"+top.y+""+top.Relic5Pic+"' width=24 height=24></td>";
tempstr+="<td width=0 bgcolor=0 height=0><img title=\""+getitem(top.Relic6)+"\" border=0 src='"+top.y+""+top.Relic6Pic+"' width=24 height=24></td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td width=0 bgcolor=0 colspan=6 height=0>";
tempstr+="<span id=s_TargetMeter></span>";
tempstr+="</td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td width=0 bgcolor=0 colspan=6 height=0>";
tempstr+="<span id=s_LifeMeter></span>";
tempstr+="</td>";
tempstr+="</tr>";
tempstr+="<tr>";
tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
tempstr+="<td background='"+top.y+"top.jpg' align=center colspan=6><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>";
tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
tempstr+="</tr>";
tempstr+="</table>";
top.frames.main.s_Window.innerHTML=tempstr;
}	
else if(mode==0 || mode==3 || mode >= 10)
{
	top.WindowMode=mode;
	tempstr="";
	tempstr+="<table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>";
	tempstr+="<tr>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td background='"+top.y+"side.jpg' rowspan=3><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>";
	tempstr+="<td width=0 bgcolor=0 height=0>";

	if(mode==0)
	{
		if(top.Target==-1 || !(top.Target.charAt(0) >=0 && top.Target.charAt(0) <=9))
		{
			if(top.Target==-1)
				sex = top.RaceSex;
			else
				sex = top.TargetRaceSex;
			tempstr+="<img title=SexRace border=0 src='"+top.y+"race"+sex+".jpg' width=144 height=168>";
		}
		else
		{
			enumber = parseInt(top.Target/1000,10)*10+9;
			erab = enumber*100;
			erab = erab.toString();
			soonum = (parseInt(top.Target/100,10)%1000);
			if(getcreature(top.Target)=="The GUARD")
			{
				enumber = parseInt(top.Guard/10,10)*10+9;
				if(enumber <= 69)
					soonum = 0;
				else
					soonum = top.Guard;
			}

			speci = 0;
			if(soonum <= 69)
			{
				tempstr+="<img title=\""+getcreature(erab)+"\" border=0 src='"+top.y+"C"+top.LocZ+enumber+".jpg' width=144 height=168>";
			}
			else if(soonum<78)
			{
				if(soonum>74)
				{
					speci=soonum-74;
					soonum=74;
				}
				else if(soonum==74)
				{
					soonum = 76;
				}
				tempstr+=adly(0,speci,144,168,getcreature(top.Target))+"<img title=\""+getcreature(top.Target)+"\" border=0 src='"+top.y+"CSpe"+(soonum-70)+".jpg' width=144 height=168>";
			}
			else if(soonum>=93)
			{
				soonum = soonum - 93 + 9;
				tempstr+=adly(0,speci,144,168,getcreature(top.Target))+"<img title=\""+getcreature(top.Target)+"\" border=0 src='"+top.y+"CSpe"+soonum+".jpg' width=144 height=168>";
			}
			else if(soonum>=90)
			{
				soonum = 6;
				tempstr+=adly(0,speci,144,168,getcreature(top.Target))+"<img title=\""+getcreature(top.Target)+"\" border=0 src='"+top.y+"CSpe"+soonum+".jpg' width=144 height=168>";
			}
			else if(soonum>=85)
			{
				if(soonum>86)
				{
					speci=soonum-83;
					soonum=87;
				}
				tempstr+=adly(0,speci,144,168,getcreature(top.Target))+"<img title=\""+getcreature(top.Target)+"\" border=0 src='"+top.y+"CSpe"+(soonum-79)+".jpg' width=144 height=168>";
			}
			else if(soonum>=83)
			{
				tempstr+="<img title=\""+getcreature(top.Target)+"\" border=0 src='"+top.y+"race24.jpg' width=144 height=168>";
			}
			else if(soonum>=78)
			{
				if(soonum > 78)
				{
					speci=soonum-78;
					soonum=78;
				}
				tempstr+="<a href=../la.htm target=_blank>"+adly(0,speci,144,168,getcreature(top.Target))+"<img title=\""+getcreature(top.Target)+"\" border=0 src='"+top.y+"CSpe5.jpg' width=144 height=168></a>";
			}
		}
	}
	else if(mode>=10)
	{
		tempstr+="<img border=0 src='"+top.y+"trade"+(mode-10)+".jpg'>";
	}
	else
	{
		tempstr+="<iframe src=../";
		tempstr+=top.TopList;
		tempstr+=".htm width=144 height=168 frameBorder=0></iframe>";
	}

	tempstr+="</td>";
	tempstr+="<td background='"+top.y+"side.jpg' rowspan=3><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td width=0 bgcolor=0 height=0>";
	tempstr+="<span id=s_TargetMeter></span>";
	tempstr+="</td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td width=0 bgcolor=0 height=0>";
	tempstr+="<span id=s_LifeMeter></span>";
	tempstr+="</td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="</tr>";
	tempstr+="</table>";
	top.frames.main.s_Window.innerHTML=tempstr;
}
else if(mode==2)
{
	top.WindowMode=mode;
	tempstr="";
	tempstr+="<table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>";
	tempstr+="<tr>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td background='"+top.y+"side.jpg' rowspan=4><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>";
	tempstr+="<td width=0 bgcolor=0 height=0><div id=divContainer><div id=divContent>";

	mapposx = top.LocX*10+5;
	mapposy = (299-top.LocY)*10+5;
	maptilem = parseInt(mapposx/200,10)+1;
	maptilem+= parseInt(mapposy/200,10)*15;

	maptilea=1;
	maptileb=1;
	maptilec=1;
	maptiled=1;
	if((mapposx%200) >= 100 && (mapposy%200) >=100)
	{
		if((maptilem%15)==0)
		{
			maptileb=0;
			maptiled=0;
		}
		if(maptilem>=211&&maptilem<=225)
		{
			maptilec=0;
			maptiled=0;
		}
		maptilem=maptilem;
		mapoffx=mapposx%200;
		mapoffy=mapposy%200;
	}
	else if((mapposx%200) >= 100 && (mapposy%200) <100)
	{
		if((maptilem%15)==0)
		{
			maptileb=0;
			maptiled=0;
		}
		if(maptilem>=1&&maptilem<=15)
		{
			maptilea=0;
			maptileb=0;
		}
		maptilem=maptilem-15;
		mapoffx=mapposx%200;
		mapoffy=mapposy%200+200;
	}
	else if((mapposx%200) < 100 && (mapposy%200) <100)
	{
		if((maptilem%15)==1)
		{
			maptilea=0;
			maptilec=0;
		}
		if(maptilem>=1&&maptilem<=15)
		{
			maptilea=0;
			maptileb=0;
		}
		maptilem=maptilem-16;
		mapoffx=mapposx%200+200;
		mapoffy=mapposy%200+200;
	}
	else if((mapposx%200) < 100 && (mapposy%200) >=100)
	{
		if((maptilem%15)==1)
		{
			maptilea=0;
			maptilec=0;
		}
		if(maptilem>=211&&maptilem<=225)
		{
			maptilec=0;
			maptiled=0;
		}
		maptilem=maptilem-1;
		mapoffx=mapposx%200+200;
		mapoffy=mapposy%200;
	}
	if(maptilea)maptilea=top.LocZ+parseInt(maptilem,10)+".jpg";
	else maptilea="c.gif";
	if(maptileb)maptileb=top.LocZ+parseInt(maptilem+1,10)+".jpg";
	else maptileb="c.gif";
	if(maptilec)maptilec=top.LocZ+parseInt(maptilem+15,10)+".jpg";
	else maptilec="c.gif";
	if(maptiled)maptiled=top.LocZ+parseInt(maptilem+16,10)+".jpg";
	else maptiled="c.gif";


	tempstr+="<img border=0 src='"+top.y+""+maptilea+"' width=200 height=200>";
	tempstr+="<img border=0 src='"+top.y+""+maptileb+"' width=200 height=200><br>";
	tempstr+="<img border=0 src='"+top.y+""+maptilec+"' width=200 height=200>";
	tempstr+="<img border=0 src='"+top.y+""+maptiled+"' width=200 height=200>";

	tempstr+="</div></div></td>";
	tempstr+="<td background='"+top.y+"side.jpg' rowspan=4><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td width=0 bgcolor=0 height=0>";
	tempstr+="<a href='javascript:Move(0)'><img border=0 src='"+top.y+"ButCompassNorth.jpg'></a><a href='javascript:Move(1)'><img border=0 src='"+top.y+"ButCompassSouth.jpg'></a><a href='javascript:Move(3)'><img border=0 src='"+top.y+"ButCompassWest.jpg'></a><a href='javascript:Move(2)'><img border=0 src='"+top.y+"ButCompassEast.jpg'></a><a href='javascript:Move(4)'><img border=0 src='"+top.y+"ButCompassUp.jpg'></a><a href='javascript:Move(5)'><img border=0 src='"+top.y+"ButCompassDown.jpg'></a>";
	tempstr+="</td>";
	tempstr+="<tr>";
	tempstr+="<td width=0 bgcolor=0 height=0>";
	tempstr+="<span id=s_TargetMeter></span>";
	tempstr+="</td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td width=0 bgcolor=0 height=0>";
	tempstr+="<span id=s_LifeMeter></span>";
	tempstr+="</td>";
	tempstr+="</tr>";
	tempstr+="<tr>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>";
	tempstr+="<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>";
	tempstr+="</tr>";
	tempstr+="</table>";
	top.frames.main.s_Window.innerHTML=tempstr;

	if(IEVER() < 9)
	{
	}
	else
		top.frames.main.document.getElementById("divContent").style.position = "relative";


	top.frames.main.document.getElementById("divContent").style.left=top.frames.main.document.getElementById("divContent").x=-mapoffx+72;
	top.frames.main.document.getElementById("divContent").style.top=top.frames.main.document.getElementById("divContent").y=-mapoffy+72;


	//domes("asdf " + (-mapoffx+72) + ", " + (-mapoffy+72));
}
upbars();
}
function getplacemes(rn)
{
if(rn==-1)return "";
else if(rn==0)return "left hand glows";
else if(rn==1)return "skull glows";
else if(rn==2)return "right hand glows";
else if(rn==3)return "forearms glow";
else if(rn==4)return "chest glows";
else if(rn==5)return "arms glow";
else if(rn==6)return "left brain glows";
else if(rn==7)return "legs glow";
else if(rn==8)return "feet glow";
else if(rn==9)return "right brain glows";
else if(rn==10)return "left hand's item glows";
else if(rn==11)return "helmet glows";
else if(rn==12)return "right hand's item glows";
else if(rn==13)return "gauntlets glow";
else if(rn==14)return "mantle glows";
else if(rn==15)return "sleeves glow";
else if(rn==16)return "first spell glows";
else if(rn==17)return "leggings glow";
else if(rn==18)return "boots glow";
else if(rn==19)return "second spell glows";
else if(rn==20)return "first relic glows";
else if(rn==21)return "second relic glows";
else if(rn==22)return "third relic glows";
else if(rn==23)return "fourth relic glows";
else if(rn==24)return "fifth relic glows";
else if(rn==25)return "sixth relic glows";
else domes("placeerror1");
}
function getrelicmes(rn,n)
{
if(rn >= 81 && rn <= 88)
rn-=10;
if(rn==-1)return "";
else if(rn==0)return "your muscles bulge.";
else if(rn==1)return "your eyesight sharpens.";
else if(rn==2)return "your feet quicken.";
else if(rn==3)return "your mind tingles.";
else if(rn==4)return "your mind clears.";
else if(rn==5)return "your mind takes guard.";
else if(rn==6)return "you feel rejuvinated.";
else if(rn==7)return "you are beset with the spirit of Titus!";
else if(rn==8)return "your enemy looks weak.";
else if(rn==9)return "your enemy looks groggy.";
else if(rn==10)return "your enemy looks sluggish.";
else if(rn==11)return "your enemy looks foolish.";
else if(rn==12)return "your enemy looks distracted.";
else if(rn==13)return "your enemy looks concerned.";
else if(rn==14)return "your enemy looks lifeless.";
else if(rn==15)return "your enemy is plagued by the spirit of Cassius!";
else if(rn==16)return "you steal your enemy's strength.";
else if(rn==17)return "you steal your enemy's dexterity.";
else if(rn==18)return "you steal your enemy's agility.";
else if(rn==19)return "you steal your enemy's intelligence.";
else if(rn==20)return "you steal your enemy's concentration.";
else if(rn==21)return "you steal your enemy's contravention.";
else if(rn==22)return "you steal your enemy's health.";
else if(rn==23)return "the spirit of Lestat possesses you!";
else if(rn==24)return "your enemy looks confused.";
else if(rn==25)return "you take your chances with the wheel.";
else if(rn==26 && n)return "you annul two of your enemy's relics.";
else if(rn==26 && !n)return "but there was nothing to annul.";
else if(rn==27)return "you feel an aura of protection.";
else if(rn==28)return "you feel dangerous.";
else if(rn==29)return "your body pulses with the blessings of Cara!";
else if(rn==30)return "time stops as your body excels.";
else if(rn==31)return "time stops as your mind excels.";
else if(rn==32)return "your enemy cringes in pain.";
else if(rn==33)return "your enemy collapses and you feel refreshed.";
else if(rn==34)return "your enemy is stricken by calamity.";
else if(rn==35)return "your enemy reaches into his chest and squeezes his own heart.";
else if(rn==36)return "you go mad.";
else if(rn==37)return "your mana surges.";
else if(rn==38)return "your enemy's veins collapse.";
else if(rn==39)return "your body pulses as the enemy cries blood.";
else if(rn==40)return "angels fall glowing tears on your target to guide your weapon.";
else if(rn==41)return "your weapon glows with intense acuity.";
else if(rn==42)return "the magic of Hades immobolizes your victim.";
else if(rn==43)return "your mind divides space and time.";
else if(rn==44)return "you feel a rush of ferocity.";
else if(rn==45)return "angels breathe life into your veins.";
else if(rn==46)return "you call on your brethren for support.";
else if(rn==47)return "the spinning of the world slows to a crawl.";
else if(rn==48)return "fibers of angelic hair enshroud your body.";
else if(rn==49)return "you cleanse your mind of all things.";
else if(rn==50)return "the fury of Hell boils in your eyes.";
else if(rn==51)return "flames leap from your heart and engulf your foe.";
else if(rn==52)return "you hear the tears of a wingless angel strike the ground.";
else if(rn==54)return "you feel a burning desire to fulfill your destiny of superiority.";
else if(rn==55)return "you take your time and concentrate on proper technique.";
else if(rn==56)return "your enemy staggers as his brains leak from his ears.";
else if(rn==57)return "your enemy twitches and falls to the ground as Vogar compresses their spine.";
else if(rn==58)return "your muscles bulge as your shirt tears into pieces and bursts into flames as your enemy cowers before you.";
else if(rn==59)return "your brain expands to the point of shattering your skull, sending fragments that tear through your enemy's flesh.";
else if(rn==60)return "the walls of space collapse as you attempt to void all your enemies enchantments.";
else if(rn==63)return "putrescent fluids begin to accumulate at the feet of your petrified foe, seeping into his skin and invading his veins with death.";
else if(rn==66)return "rage fills your heart and veins as you pulse with the combined force of all who seek revenge.";
else if(rn==67)return "lightning fills the sky as your pupils turn red with the blood of your past foes.";
else if(rn==68)return "you watch your enemy attempt to scream in pain as his tongue melts into boiling blood and scalds his insides.";
else if(rn==69)return "the eyes of your enemy roll back in his head as he falls to his knees and begins to remove his own flesh.";
else if(rn==71)return "your enemy begins to twitch and convulse as his eyes collapse.";
else if(rn==72)return "your enemy spasms in such severity that his spinal cord twists and breaks.";
else if(rn==73)return "your enemy vomits his own bath of acid and allows it to melt his flesh.";
else if(rn==74)return "your enemy's bones become weakened and shatter from the vibrations caused by his shrieks of horror and pain.";
else if(rn==75)return "your enemy's attempt to avoid your eyes fail him as he becomes entranced with fear seeing the essence of death within you.";
else if(rn==76)return "your enemy flinches uncontrollably, biting down through his tongue, shattering his teeth which penetrate his gums.";
else if(rn==77)return "your enemy kneels before you as your black horses of war surround him.";
else if(rn==78)return "your enemy pleads before your throne that you spare him as you spill his blood on your piles of treasure below.";
else if(rn==79)return "you call upon the powers below to render your enemy's relics useless.";
else return "";
}
function retrace(race)
{
if(race==24)
race=12;
else
race%=12;
 if(race==0)return "Human";
else if(race==1)return "Dwarf";
else if(race==2)return "Drow";
else if(race==3)return "Sylvain";
else if(race==4)return "Galatai";
else if(race==5)return "Troll";
else if(race==6)return "Ogre";
else if(race==7)return "Goblin";
else if(race==8)return "Gnome";
else if(race==9)return "Solon";
else if(race==10)return "Mesmer";
else if(race==11)return "Balace";
else if(race==12)return "Templar";
}
function TSOT(pow)
{
ret=10;
for(x=0;x<pow;x++)
ret*=1.306;
if(ret > 1999999999)
return 2000000000;

if(ret >999999999)
ret=parseInt((ret/100000000),10)*100000000;
if(ret >99999999)
ret=parseInt((ret/10000000),10)*10000000;
else if(ret >9999999)
ret=parseInt((ret/1000000),10)*1000000;
else if(ret >999999)
ret=parseInt((ret/100000),10)*100000;
else if(ret >99999)
ret=parseInt((ret/10000),10)*10000;
else if(ret >9999)
ret=parseInt((ret/1000),10)*1000;
else if(ret >999)
ret=parseInt((ret/100),10)*100;
else if(ret >99)
ret=parseInt((ret/10),10)*10;
else if(ret >9)
ret=parseInt((ret/1),10)*1;
else
ret=parseInt(ret,10);
return ret;
}
function upfight(thefdata)
{
NewFight=thefdata.split("|");
NewFightList=NewFight[0].split("<");
fsubf="";
if(NewFightList[0]=="34")
fsubf+="<i>";
//fsubf+="&gt;";
for(y=1;y < NewFightList.length;y++)
{
fsubf+=NewFightList[y];
if(y+1<NewFightList.length)
	fsubf+="<";
}
if(NewFightList[0]=="34")
fsubf+="</i>";
if(top.frames.main.s_Response.innerHTML!="")
top.frames.main.s_Response.innerHTML = top.frames.main.s_Response.innerHTML + "<br>" + fsubf;
else
top.frames.main.s_Response.innerHTML = top.frames.main.s_Response.innerHTML + fsubf;
}
function upchat(thecdata)
{
if(top.OldChat==null)
{
top.OldChat=["",""];
for(j=0;j<top.ChatSize;j++)
	top.OldChat[j]="";
}
NewChat=thecdata.split("|");
stupid = 0;
for(j=top.ChatSize;j >=0 && stupid < 110;j--)
{
stupid++;
if(j < NewChat.length-1)
{
	NewChatList=NewChat[j].split("<");
	top.OldChat[j]="";
	if(NewChatList[2]=="Glitchless" || NewChatList[2]=="Glitchless2")
	{
		top.OldChat[j]+="<b><font size=4>";
		if(NewChatList[0]!="6" && NewChatList[0]!="5")
			NewChatList[1]="Admin";
	}
	locsplit=NewChatList[1].split(",");
	if((NewChatList[0]=="0" || NewChatList[0]=="10") && locsplit[0].charAt(0)!="0" && locsplit[0].charAt(0)!="1" && locsplit[0].charAt(0)!="2" && (locsplit[0].charAt(0)!="*" && locsplit[0].charAt(0)!="x"))
		locsplit[1]=top.LocZ;
	if(locsplit[1]=="Sur")
  		top.OldChat[j]+="<font color=#C8C8C8>";
	else if(locsplit[1]=="Dun")
		top.OldChat[j]+="<font color=#FFBBBB>";
	else if(locsplit[1]=="Sky")
		top.OldChat[j]+="<font color=#BBBBFF>";
	else if(locsplit[1]=="Hev")
		top.OldChat[j]+="<font color=#6666FF>";
	else if(locsplit[1]=="Hel")
		top.OldChat[j]+="<font color=#FF6666>";
	else if(locsplit[1]=="For")
		top.OldChat[j]+="<font color=#969696>";
	if(NewChatList[0]=="0" || NewChatList[0]=="10" || NewChatList[0]=="1" || NewChatList[0]=="11" || NewChatList[0]=="6" || NewChatList[0]=="8")
	{
		subgee=top.ignorelist;
		amounty=subgee.length;
		badboy=0;
		for(xxi=0;xxi < amounty;xxi++)
		{
			if(subgee[xxi]==mn(NewChatList[2]))
				badboy=1;
		}
		if(!badboy && (NewChatList[0]=="0"|| NewChatList[0]=="10"))
			top.OldChat[j]+="["+ms(NewChatList[1])+"] <a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a>: "+ms(NewChatList[3]);
		else if(!badboy && (NewChatList[0]=="1" || NewChatList[0]=="11"))
			top.OldChat[j]+="["+ms(NewChatList[1])+"] <a href=javascript:pm('"+NewChatList[2]+"')><i><font color=#FFFFFF>"+ms(NewChatList[2])+"</a> "+ms(NewChatList[3])+"</font></i>";
		else if(!badboy && (NewChatList[0]=="1" || NewChatList[0]=="11"))
			top.OldChat[j]+="["+ms(NewChatList[1])+"] <a href=javascript:pm('"+NewChatList[2]+"')><i><font color=#FFFFFF>"+ms(NewChatList[2])+"</a> "+ms(NewChatList[3])+"</font></i>";
		else if(!badboy && (NewChatList[0]=="6"))
			top.OldChat[j]+="<font color=#CCCC22><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> offers you a "+getitem(NewChatList[1])+" for "+mc(NewChatList[3])+" gold. <a href=javascript:TAccept('"+NewChatList[2]+"',"+NewChatList[1]+","+NewChatList[3]+")>Accept?</a></font>";
		else if(!badboy && (NewChatList[0]=="8"))
			top.OldChat[j]+="<font color=#CCCC22><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> gives you "+mc(NewChatList[3])+" gold.</font>";
		else
		{
			top.OldChat[j]="";
			continue;
		}
	}
	else if(NewChatList[0]=="22" || NewChatList[0]=="32" || NewChatList[0]=="42")
		top.OldChat[j]+="<font color=#FCFF11><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> "+ms(NewChatList[3])+"</font>";
	else if(NewChatList[0]=="7")
		top.OldChat[j]+="<font color=#CCCC22><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> accepted your "+getitem(NewChatList[1])+" for "+mc(NewChatList[3])+" gold.</font>";
	else if(NewChatList[0]=="9")
		top.OldChat[j]+="<font size=5 color=#CCCC22>You find a "+getitem(NewChatList[1])+".</font>";
	else if(NewChatList[0]=="12")
		top.OldChat[j]+="<font size=5 color=#CCCC22>You find a "+getitem(NewChatList[1])+" on the enemy's corpse!</font> <a href=javascript:burnit('"+NewChatList[1]+"')>Click to DESTROY.</a>";
	else if(NewChatList[0]=="13")
		top.OldChat[j]+="<font color=#EEEE44>You see a "+getitem(NewChatList[1])+" in their inventory.</font>";
	else if(NewChatList[0]=="5")
		top.OldChat[j]+="<font color=#CCCC22><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> gives you a "+getitem(NewChatList[1])+".</font>";
	else if(NewChatList[0]=="58" || NewChatList[0]=="91" || NewChatList[0]=="92" || NewChatList[0]=="94")
	{
		subgee=top.ignorelist;
		amounty=subgee.length;
		badboy=0;
		for(xxi=0;xxi < amounty;xxi++)
		{
			if(subgee[xxi]==mn(NewChatList[2]))
				badboy=1;
		}
		if(!badboy)
		{
			if(NewChatList[0]=="94")
				top.OldChat[j]+="<font color=#FF2222>";
			else if(NewChatList[0]=="92")
				top.OldChat[j]+="<font color=#CC00CC>";
			else if(NewChatList[0]=="91")
				top.OldChat[j]+="<font color=#4444FF>";
			else
				top.OldChat[j]+="<font color=#C0C0C0>";
			top.OldChat[j]+="<u>PM from</u> <a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a>: \"<u>"+ms(NewChatList[3])+"</u>\"</font>";
		}
		else
		{
			top.OldChat[j]="";
			continue;
		}
	}
	else if(NewChatList[0]=="3")
		top.OldChat[j]+="<font color=#CC00CC><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> "+ms(NewChatList[3])+"</font>";
	else if(NewChatList[0]=="80")
		top.OldChat[j]+="<font color=#C8686A>Message sent to </font><font color=#CC00CC><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> "+ms(NewChatList[3])+"</font>";
	else if(NewChatList[0]=="56")
		top.OldChat[j]+="["+ms(NewChatList[1])+"] <a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a>: "+ms(NewChatList[3]);
	else if(NewChatList[0]=="53")
		top.OldChat[j]+="<font color=#CCCC22><a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a> "+ms(NewChatList[3])+"</font>";
	else if(NewChatList[0]=="54")
	{
		top.OldChat[j]+="<font color=#00FF00>Your skill in "+top.skillz[top.Skill]+" has increased to "+ms(NewChatList[3])+"!</font>";
	}
	else if(NewChatList[0]=="57" || NewChatList[0]=="59")
	{
		tempypoo = NewChatList[3].split("!");
		for(asi=0;asi<12;asi++)
			tempypoo[asi]*=tempypoo[12];
		if(NewChatList[0]=="57")
			top.OldChat[j]+="<font color=#CC00CC><b>Stats as Affected Only By Relics</b>";
		else
			top.OldChat[j]+="<font color=#CC00CC><b>Stats as Affected By All Modifiers</b>";
		top.OldChat[j]+="(Accurate to nearest "+mc(tempypoo[12])+")<br>&nbsp;Str: "+mc(tempypoo[0])+"<br>&nbsp;Dex: "+mc(tempypoo[1])+"<br>&nbsp;Agi: "+mc(tempypoo[2])+"<br>&nbsp;Ntl: "+mc(tempypoo[3])+"<br>&nbsp;Cnc: "+mc(tempypoo[4])+"<br>&nbsp;Cnt: "+mc(tempypoo[5])+"<br>&nbsp;Dur: "+mc(tempypoo[6])+"<br>&nbsp;First Attack: "+mc(tempypoo[7])+"<br>&nbsp;Second Attack: "+mc(tempypoo[8])+"<br>&nbsp;First Cast: "+mc(tempypoo[9])+"<br>&nbsp;Second Cast: "+mc(tempypoo[10])+"<br>&nbsp;Armor Defense: "+mc(tempypoo[11])+"</font>";
	}
	else if(NewChatList[0]=="60")
	{
		tempypoo = NewChatList[3].split("!");
		top.OldChat[j]+="<font color=#CC00CC><b>Skills</b><br>&nbsp;"+top.skillz[0]+": "+mc(tempypoo[0])+"<br>&nbsp;"+top.skillz[1]+": "+mc(tempypoo[1])+"<br>&nbsp;"+top.skillz[2]+": "+mc(tempypoo[2])+"<br>&nbsp;"+top.skillz[3]+": "+mc(tempypoo[3])+"<br>&nbsp;"+top.skillz[4]+": "+mc(tempypoo[4])+"<br>&nbsp;"+top.skillz[5]+": "+mc(tempypoo[5])+"<br>&nbsp;"+top.skillz[6]+": "+mc(tempypoo[6])+"<br>&nbsp;"+top.skillz[7]+": "+mc(tempypoo[7])+"<br>&nbsp;"+top.skillz[8]+": "+mc(tempypoo[8])+"<br>&nbsp;"+top.skillz[9]+": "+mc(tempypoo[9])+"<br>&nbsp;"+top.skillz[10]+": "+mc(tempypoo[10])+"<br>&nbsp;"+top.skillz[11]+": "+mc(tempypoo[11])+"<br>&nbsp;"+top.skillz[12]+": "+mc(tempypoo[12])+"</font>";
	}
	else if(NewChatList[0]=="61")
	{
		tempypoo = NewChatList[3].split("!");
		maxit=0;
		for(sji=0;sji<12;sji++)
		{
			tempypoo[sji] = parseInt(tempypoo[sji],10);
			if(tempypoo[sji]>maxit)maxit=tempypoo[sji];
		}
		maxit=parseInt((maxit/60),10);
		top.OldChat[j]+="<font color=#CC00CC><b>Trade Skills Rank: "+top.titlez[maxit]+"</b><br>";
		for(sji=0;sji<6;sji++)
			top.OldChat[j]+="&nbsp;"+top.tradez[sji]+"crafting: "+mc(tempypoo[sji])+"<br>";
		for(sji=0;sji<6;sji++)
		{
			top.OldChat[j]+="&nbsp;"+top.subz[sji]+"working: "+mc(tempypoo[sji+6]);
			if(sji!=5)
				top.OldChat[j]+="<br>";
		}
		top.OldChat[j]+="</font>";
	}
	else if(NewChatList[0]=="62")
	{
		tempypoo = NewChatList[3].split("!");
		top.OldChat[j]+="<font color=#00FF00>Your skill in "+top.tradez[tempypoo[0]]+"crafting has improved to "+mc(tempypoo[1])+"!</font>";
	}
	else if(NewChatList[0]=="63")
	{
		tempypoo = NewChatList[3].split("!");
		top.OldChat[j]+="<font color=#00FF00>Your skill in "+top.subz[tempypoo[0]]+"working has improved to "+mc(tempypoo[1])+"!</font>";
	}
	else if(NewChatList[0]=="64")
	{
		top.OldChat[j]+="<font color=#00FF00>While you have $15 trial access you can get a $5 discount on all Paypal purchases. Click <a target=_blank href=../order/pay2.htm>here</a> to access the discounted item page. $45 orders still crack rocks.</font>";
	}
	else if(NewChatList[0]=="65")
	{
		open(NewChatList[3],"RWK","height=640,width=480,scrollbars=1");
		top.OldChat[j]+="<font color=#556633>Opening Picture. Click <a target=_blank href='" + NewChatList[3] + "'>here</a> if it fails to open due to your pop up blockers.</font>";
	}
	else if(NewChatList[0]=="4")
	{
		subgee=top.ignorelist;
		amounty=subgee.length;
		badboy=0;
		for(xxi=0;xxi < amounty;xxi++)
		{
			if(subgee[xxi]==mn(NewChatList[2]))
				badboy=1;
		}
		if(!badboy)
			top.OldChat[j]+="<font color=#009933>["+ms(NewChatList[1])+"] <a href=javascript:pm('"+NewChatList[2]+"')>"+ms(NewChatList[2])+"</a>: "+ms(NewChatList[3])+"</font>";
		else
		{
			top.OldChat[j]="";
			continue;
		}
	}
	else if(NewChatList[0]=="33" || NewChatList[0]=="34")
	{
		if(NewChatList[0]=="34")
			top.OldChat[j]+="<i>";
		for(y=1;y < NewChatList.length;y++)
		{
			top.OldChat[j]+=NewChatList[y];
			if(y+1<NewChatList.length)
				top.OldChat[j]+="<";
		}
		if(NewChatList[0]=="34")
			top.OldChat[j]+="</i>";
	}
	else if(NewChatList[0]=="79")
	{
		top.OldChat[j]+="<font color=#CC00CC>";
		for(y=1;y < NewChatList.length;y++)
		{
			top.OldChat[j]+=NewChatList[y];
			if(y+1<NewChatList.length)
				top.OldChat[j]+="<";
		}
		top.OldChat[j]+="</font>";
	}
	//else
	//	domes("ERROR: "+NewChatList[0]);
	if(NewChatList[2]=="Glitchless" || NewChatList[2]=="Glitchless2")
		top.OldChat[j]+="</font></b>";
	if(locsplit[1]=="Sur")
		top.OldChat[j]+="</font>";
	else if(locsplit[1]=="Dun")
		top.OldChat[j]+="</font>";
	else if(locsplit[1]=="Sky")
		top.OldChat[j]+="</font>";
	else if(locsplit[1]=="Hev")
		top.OldChat[j]+="</font>";
	else if(locsplit[1]=="Hel")
		top.OldChat[j]+="</font>";
	else if(locsplit[1]=="For")
		top.OldChat[j]+="</font>";
}
else
{
	top.OldChat[j]=top.OldChat[j-(NewChat.length-1)];
	if(top.OldChat[j]==null)
		top.OldChat[j]="";
}
}
NewChat="";
for(j=0;j<top.ChatSize;j++)
{
if(top.OldChat[j]!="")
	NewChat+="&nbsp;"+top.OldChat[j]+"<br>";
}
top.frames.main.s_Chat.innerHTML=NewChat;
}
function pollzero(gg, override)
{
	if(top.Update==1)
	{
		alert("You must wait for your first command to be processed or timeout in "+(10000-top.dActionDelay)/1000+" seconds.");
		top.Visible=1;
		return;
	}
	if(!top.DisBar && top.ActionDelay > 0 && gg.action.value != "chat" && gg.action.value != "pfold" && gg.action.value != "pcall" && gg.action.value != "pplay" && gg.action.value != "praise1" && gg.action.value != "praise2" && gg.action.value != "praise3" && gg.action.value != "options" && gg.action.value != "refresh" && gg.action.value != "rj1" && gg.action.value != "bj1" && gg.action.value != "rq1" && gg.action.value != "bq1" && gg.action.value != "rk1" && gg.action.value != "bk1" && gg.action.value != "ra1" && gg.action.value != "ba1" && gg.action.value != "rj2" && gg.action.value != "bj2" && gg.action.value != "rq2" && gg.action.value != "bq2" && gg.action.value != "rk2" && gg.action.value != "bk2" && gg.action.value != "ra2" && gg.action.value != "ba2")
	{
		domes("You must wait until the delay bar is depleted to do an action.");
		return;
	}
	if((gg.action.value == "burn" || gg.action.value == "sell") && !override)
	{
		if(gg.target.options[gg.target.selectedIndex].text.replace("EQUIPPED", "") != gg.target.options[gg.target.selectedIndex].text)
		{
			domes("This item is EQUIPPED and cannot be sold, destroyed, or traded.");
			return;
		}
	}
	if(gg.action.value == "trade")
	{
		if(gg.other.options[gg.other.selectedIndex].text.replace("EQUIPPED", "") != gg.other.options[gg.other.selectedIndex].text)
		{
			domes("This item is EQUIPPED and cannot be sold, destroyed, or traded.");
			return;
		}
	}
	if(gg.action.value == "chat")
	{
		ned = gg.target.value.replace("\"", "`");
		while(ned != gg.target.value)
		{
			gg.target.value = ned;
			ned = gg.target.value.replace("\"", "`");
		}
		ned = gg.target.value.replace("'", "`");
		while(ned != gg.target.value)
		{
			gg.target.value = ned;
			ned = gg.target.value.replace("'", "`");
		}
		ned = gg.target.value.replace("<", "(");
		while(ned != gg.target.value)
		{
			gg.target.value = ned;
			ned = gg.target.value.replace("<", "(");
		}
		ned = gg.target.value.replace(">", ")");
		while(ned != gg.target.value)
		{
			gg.target.value = ned;
			ned = gg.target.value.replace(">", ")");
		}
		ned = gg.target.value.replace("|", "l");
		while(ned != gg.target.value)
		{
			gg.target.value = ned;
			ned = gg.target.value.replace("|", "l");
		}
		if(gg.target.value == "" || gg.target.value == " ")
		{
			domes("Can't send an empty message.");
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "m" && gg.target.value.charAt(2) != "e")
		{
			domes("<font color=#C1B95F>Message sent to</font> " + gg.target.value.substring(3, gg.target.value.length));
		}
		else if(gg.target.value.charAt(0) == "/" && gg.target.value.length < 24)
		{
			s_quickie.innerHTML = "<input type=button value='" + gg.target.value + "' onClick=\"genfull('chat','" + gg.target.value + "',0)\" STYLE='font-size:8pt; background-color:000000; color:ABB5BF'>";
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "a" && gg.target.value.charAt(2) == "n")
		{
			open("../ann.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Announcements. Click <a target=_blank href=../ann.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "g" && gg.target.value.charAt(2) == "i" && gg.target.value.charAt(3) == "r")
		{
			open("../girl.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Girlfriend Info Page. Click <a target=_blank href=../girl.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "s" && gg.target.value.charAt(2) == " ")
		{
			tehgf = gg.target.value.substring(3, gg.target.value.length);
			while(tehgf != tehgf.replace(" ", "_"))
			{
				tehgf = tehgf.replace(" ", "_");
			}
			open("rwk.cgi?swimsuit" + tehgf);
			upchat(79 + "<" + "<font color=#556633>Opening Swimsuit Pic. Click <a target=_blank href=rwk.cgi?swimsuit" + tehgf + ">here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "g" && gg.target.value.charAt(2) == "f")
		{
			tehgf = top.login;
			if(gg.target.value.charAt(3) == " ")
			{
				tehgf = gg.target.value.substring(4, gg.target.value.length);
			}
			while(tehgf != tehgf.replace(" ", "_"))
			{
				tehgf = tehgf.replace(" ", "_");
			}
			open("rwk.cgi?gf" + tehgf);
			upchat(79 + "<" + "<font color=#556633>Opening Girlfriend Photo Album. Click <a target=_blank href=rwk.cgi?gf" + tehgf + ">here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "f" && gg.target.value.charAt(2) == "a")
		{
			open("../faq.htm");
			upchat(79 + "<" + "<font color=#556633>Opening FAQ. Click <a target=_blank href=../faq.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "p" && gg.target.value.charAt(2) == "o")
		{
			genfull("options", 15, 1);
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "h" && gg.target.value.charAt(2) == "e")
		{
			open("../help/");
			upchat(79 + "<" + "<font color=#556633>Opening Help Site. Click <a target=_blank href=../help/>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "s" && gg.target.value.charAt(2) == "p" && gg.target.value.charAt(3) == "r")
		{
			open("../spray.htm");
			upchat(79 + "<" + "<font color=#556633>Opening CS:S Spray Site. Click <a target=_blank href=../spray.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "d" && gg.target.value.charAt(2) == "i" && gg.target.value.charAt(3) == "s")
		{
			upchat(79 + "<" + "<font color=#C1B95F>You have chosen to disable the action hindrance of your delay bar, The server STILL RESTRICTS THE SPEED AT WHICH YOU DO ACTIONS. If you are doing actions that require a large delay and you do not wait long enough in between them YOU WILL RECEIVE MULTIPLE 10 SECOND PENALTIES. This is an advanced feature that will not help the average player but instead hurt you. The delay bar is your friend. It helps prevent you from getting 10 second penalties by doing actions too quickly. To enable it type /enable.</font>" + "|");
			top.DisBar = 1;
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "s" && gg.target.value.charAt(2) == "h" && gg.target.value.charAt(3) == "h")
		{
			if(!top.NoBattle)
			{
				upchat(79 + "<" + "<font color=#C1B95F>You have chosen to disable battle messages. This is for advanced users only who are trying to avoid battle spam from attackers. Type /shh again if you didn't mean to do this.</font>" + "|");
				top.NoBattle = 1;
			}
			else
			{
				upchat(79 + "<" + "<font color=#C1B95F>You have chosen to re-enable battle messages.</font>" + "|");
				top.NoBattle = 0;
			}
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "e" && gg.target.value.charAt(2) == "n" && gg.target.value.charAt(3) == "a")
		{
			upchat(79 + "<" + "<font color=#C1B95F>Delay bar enabled.</font>" + "|");
			top.DisBar = 0;
			gg.target.value = "";
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "a" && gg.target.value.charAt(2) == "d")
		{
			hl(gg.target.value.substring(5, gg.target.value.length));
			gg.target.value = "";
			upplayers();
			return;
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1).toLowerCase() == "s" && gg.target.value.charAt(2).toLowerCase() == "u" && gg.target.value.charAt(3).toLowerCase() == "s")
		{
			kd_value = parseInt(parseFloat(top.Tres) + parseFloat(top.Food) + parseFloat(top.Runes)*1000000000 + parseFloat(top.Soldiers) + parseFloat(top.Archers) + parseFloat(top.Catapults) + parseFloat(top.Trebuchets) + parseFloat(top.WallN) + parseFloat(top.WallS) + parseFloat(top.WallE) + parseFloat(top.WallW) + parseFloat(top.MoatN) + parseFloat(top.MoatS) + parseFloat(top.MoatE) + parseFloat(top.MoatW) + parseFloat(top.CannonN) + parseFloat(top.CannonS) + parseFloat(top.CannonE) + parseFloat(top.CannonW) + .99);
			if(kd_value < 10000000000)
				domes("Kingdom UNABLE to sustain. Value: " + mc(kd_value) + ".");
			else
				domes("Kingdom is sustainable. Value: " + mc(kd_value) + "!")
			gg.target.value = "";
			return;
		}
		if(gg.other.value != 0 && gg.other.value != 1 && gg.other.value != 2 && gg.other.value != 3)
		{
			domes("<font color=#C1B95F>Message sent to</font> " + gg.other.value + ": " + gg.target.value);
		}
		if(gg.target.value.charAt(0) == "/" && gg.target.value.charAt(1) == "l" && gg.target.value.charAt(2) == "i")
		{
			upchat(79 + "<" + "<font color=#C1B95F>Referral system deactivated.</font>" + "|");
			gg.target.value = "";
			return;
		}
		firstpart = gg.target.value.substring(0, 8);
		lastpart = gg.target.value.substring(8, gg.target.value.length);
		if(firstpart == "/ignore ")
		{
			il(mn(lastpart));
			gg.target.value = "";
			return;
		}
		if(gg.target.value == "/ignore")
		{
			for(ii = 19; ii >= 0; ii--)
			{
				if(top.ignorelist[ii] != "")
				{
					upchat(79 + "<" + top.ignorelist[ii] + "|");
				}
			}
			upchat(79 + "<Ignored Players:|");
			gg.target.value = "";
			return;
		}
		if(gg.target.value == "/inv")
		{
			top.frames.main.document.getElementById('general').action.options.selectedIndex = 9;
			top.frames.main.updateaction(top.frames.main.document.getElementById('general').action.options[top.frames.main.document.getElementById('general').action.options.selectedIndex].value, top.frames.main.document.getElementById('general'));
			for(ii = top.frames.main.document.getElementById('general').target.length - 1; ii >= 0; ii--) domes(top.frames.main.document.getElementById('general').target.options[ii].text);
			gg.target.value = "";
			return;
		}
	}
	if(gg.action.value == "ts")
	{
		itype = gg.target.value;
		tradeskill = 0;
		if(itype == 0 || itype == 14 || itype == 15 || itype == 16) //weapon
		{
			tradeskill = 0;
		}
		else if(itype == 6 || itype == 9 || itype == 17 || itype == 18 || itype == 19) //spell
		{
			tradeskill = 3;
		}
		else if(itype == 12 || itype == 13) //bow
		{
			tradeskill = 2;
		}
		else if(itype == 10 || itype == 27) //relic
		{
			tradeskill = 4;
		}
		else //armor
		{
			tradeskill = 1;
		}
		upwindow(10 + tradeskill);
	}
	if(gg.action.value == "viewtops")
	{
		top.TopList = gg.target.value;
		if(top.TopList == "msky")
		{
			open("../msky.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Sky Map. Click <a target=_blank href=../msky.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			return;
		}
		if(top.TopList == "msur")
		{
			open("../msur.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Surface Map. Click <a target=_blank href=../msur.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			return;
		}
		if(top.TopList == "mdun")
		{
			open("../mdun.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Dungeon Map. Click <a target=_blank href=../mdun.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			return;
		}
		if(top.TopList == "mhel")
		{
			open("../mhel.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Hell Map. Click <a target=_blank href=../mhel.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			return;
		}
		if(top.TopList == "mhev")
		{
			open("../mhev.htm");
			upchat(79 + "<" + "<font color=#556633>Opening Heaven Map. Click <a target=_blank href=../mhev.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			return;
		}
		if(top.TopList == "mfor")
		{
			open("../mfor.htm");
			upchat(79 + "<" + "<font color=#556633>Opening the Forge Map. Click <a target=_blank href=../mfor.htm>here</a> if it fails to open due to your pop up blockers.</font>" + "|");
			return;
		}
		upwindow(3);
		return;
	}
	top.PendingLastAction = gg.action.value;
	top.pollcount = 0;
	top.Update = 1;
	top.frames.main.s_chatbut.style.display = top.frames.main.s_subbut2.style.display = top.frames.main.s_subbut.style.display = "none";
	top.frames.main.s_chatbutNO.style.display = top.frames.main.s_subbut2NO.style.display = top.frames.main.s_subbutNO.style.display = "inline";

	//gg.submit();
	var actionstr = "";
    var elements = gg.elements;
    for(var i = 0 ; i < elements.length ; i++)
	{
        var item = elements.item(i);
        actionstr += encodeURIComponent(item.name).replace(/%20/g, "+") + "=" + encodeURIComponent(item.value).replace(/%20/g, "+") + "&";
    }
	ajax.post(httpspath() + "rwk.cgi", actionstr, GotActionData, true);

	top.Visible = 0;
	top.dActionDelay = 0;
	top.dActionInc = 10000;
	downdelay();
}
function black(ggg)
{
	ggg.style.backgroundColor="#222222";
	ggg.style.color="#FFFFFF";
}
function updelay()
{
    top.ActionDelay -= 50;
    if (top.ActionDelay >= 0) {
        setTimeout(function() {
            updelay();
        }, 50);
        if (!top.DisBar) {
            top.frames.main.s_subbut2.style.display = top.frames.main.s_subbut.style.display = "none";
            top.frames.main.s_subbut2NO.style.display = top.frames.main.s_subbutNO.style.display = "inline";
        }
    } else {
        top.frames.main.s_subbut2.style.display = top.frames.main.s_subbut.style.display = "inline";
        top.frames.main.s_subbut2NO.style.display = top.frames.main.s_subbutNO.style.display = "none";
    }

	top.frames.main.s_ActionDelay.innerHTML = "<table border=0 width='100%' cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "ml.jpg'></td><td width=" + (top.ActionDelay * 100 / top.ActionInc) + "% background='" + top.y + "mfa.jpg' align=right></td><td width=" + (100 - (top.ActionDelay * 100 / top.ActionInc)) + "% background='" + top.y + "mee.jpg'></td><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "mr.jpg'></td></tr></table>";
}
function downdelay()
{
if(top.Update!=1)
{
return;
}
top.dActionDelay +=1000;
if(!top.Visible && (top.dActionDelay*100/top.dActionInc)<100 && top.Update==1)
{
setTimeout("downdelay()","1000");
return;
}
if((top.dActionDelay*100/top.dActionInc)>=100)
{
top.frames.main.s_Response.innerHTML="<font size=4>Request timed out...check your connection and try again.</font>"
top.Update=0;
top.dActionDelay=0;
top.frames.main.s_chatbut.style.display = top.frames.main.s_subbut2.style.display = top.frames.main.s_subbut.style.display = "inline";
top.frames.main.s_chatbutNO.style.display = top.frames.main.s_subbut2NO.style.display = top.frames.main.s_subbutNO.style.display = "none";
}
else if((top.dActionDelay*100/top.dActionInc)<100 && top.Update==1)
{
setTimeout("downdelay()","100");
top.frames.main.s_chatbut.style.display = top.frames.main.s_subbut2.style.display = top.frames.main.s_subbut.style.display = "none";
top.frames.main.s_chatbutNO.style.display = top.frames.main.s_subbut2NO.style.display = top.frames.main.s_subbutNO.style.display = "inline";
}
top.frames.main.s_ActionDelay.innerHTML="<table border=0 width=100% cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=15 width=11 src='"+top.y+"ml.jpg'></td><td width="+(top.dActionDelay*100/top.dActionInc)+"% background='"+top.y+"mfa.jpg' align=right></td><td width="+(100-(top.dActionDelay*100/top.dActionInc))+"% background='"+top.y+"mee.jpg'></td><td width=0 bgcolor=0><img border=0 height=15 width=11 src='"+top.y+"mr.jpg'></td></tr></table>";
}
function level(thetype)
{
	top.frames.main.document.getElementById("skipform").action.value="level";
	top.frames.main.document.getElementById("skipform").target.value=thetype;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function revive(thetype)
{
	top.frames.main.document.getElementById("skipform").action.value="revive";
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function security(secnum)
{
	top.frames.main.document.getElementById("skipform").action.value="security";
	top.frames.main.document.getElementById("skipform").target.value=secnum;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function orient(dire)
{
if(dire == 1)
top.PokerTop = 1;
else if(dire == 2)
top.PokerTop = 0;
else if(dire == 3)
top.PokerLeft = 1;
else
top.PokerLeft = 0;
}
function upoker()
{
if(top.PokerTop)
top.frames.main.pokertable.style.top = top.frames.main.document.body.scrollTop+3;
else
top.frames.main.pokertable.style.top = top.frames.main.document.body.scrollTop+top.window.document.body.clientHeight-163;
if(top.PokerLeft==1)
top.frames.main.pokertable.style.left = top.frames.main.document.body.scrollLeft+3;
else if(top.PokerLeft==0)
top.frames.main.pokertable.style.left = top.frames.main.document.body.scrollLeft+top.window.document.body.clientWidth-743;
else
top.frames.main.pokertable.style.left = (top.window.document.body.clientWidth+top.frames.main.document.body.scrollLeft-720)/2;
if(top.PokerLive)
	setTimeout('top.frames.main.upoker()',50);
}
function pupdate()
{
	gg = top.frames.main;
	gg.PokerFold.className=gg.PokerCall.className=gg.PokerRaise1.className=gg.PokerRaise2.className=gg.PokerRaise3.className=gg.PokerPlay.className="vis2";
	if(!top.PokerLive)
	{
		v = "vis2";
		top.frames.main.RJ1.className=top.frames.main.RJ2.className=v;
		top.frames.main.BJ1.className=top.frames.main.BJ2.className=v;
		top.frames.main.RQ1.className=top.frames.main.RQ2.className=v;
		top.frames.main.BQ1.className=top.frames.main.BQ2.className=v;
		top.frames.main.RK1.className=top.frames.main.RK2.className=v;
		top.frames.main.BK1.className=top.frames.main.BK2.className=v;
		top.frames.main.RA1.className=top.frames.main.RA2.className=v;
		top.frames.main.BA1.className=top.frames.main.BA2.className=v;
		gg.PokerCard1.className=gg.PokerCard2.className=gg.PokerCard3.className=gg.PokerCard4.className=gg.PokerCard5.className=gg.PokerCard6.className=gg.PokerCard7.className=v;
		return;
	}
	if(top.RJ)v="vis1";else v="vis2";
	top.frames.main.RJ1.className=top.frames.main.RJ2.className=v;
	if(top.BJ)v="vis1";else v="vis2";
	top.frames.main.BJ1.className=top.frames.main.BJ2.className=v;
	if(top.RQ)v="vis1";else v="vis2";
	top.frames.main.RQ1.className=top.frames.main.RQ2.className=v;
	if(top.BQ)v="vis1";else v="vis2";
	top.frames.main.BQ1.className=top.frames.main.BQ2.className=v;
	if(top.RK)v="vis1";else v="vis2";
	top.frames.main.RK1.className=top.frames.main.RK2.className=v;
	if(top.BK)v="vis1";else v="vis2";
	top.frames.main.BK1.className=top.frames.main.BK2.className=v;
	if(top.RA)v="vis1";else v="vis2";
	top.frames.main.RA1.className=top.frames.main.RA2.className=v;
	if(top.BA)v="vis1";else v="vis2";
	top.frames.main.BA1.className=top.frames.main.BA2.className=v;
	if(top.PokerTimer > 0)
		top.PokerTimer -= 1;
	else
		top.PokerTimer = 100;
	//if((top.PokerTimer%10)==8)
	//	dopoll(500);
	if(top.PokerTimer > 80)
	{
		if(top.pCards1==0)
		{
			gg.PokerCard1.className=gg.PokerCard2.className=gg.PokerCard3.className=gg.PokerCard4.className=gg.PokerCard5.className=gg.PokerCard6.className=gg.PokerCard7.className="vis2";
			gg.PokerMessage.innerHTML = (top.PokerTimer-80) + " SECONDS LEFT TO CLICK PLAY";
			gg.PokerPlay.className="vis1";
		}
		else
			gg.PokerMessage.innerHTML = (top.PokerTimer-80) + " SECONDS UNTIL HAND BEGINS";
		gg.PokerMaxBet.innerHTML = "-";
	}
	else if(top.pCards1==0)
	{
		gg.PokerMessage.innerHTML = (top.PokerTimer) + " SECONDS UNTIL NEXT HAND";
	}
	else
	{
		gg.PokerFold.className="vis1";
		if(top.PokerTimer > 70)
		{
			gg.PokerMessage.innerHTML = (top.PokerTimer-70) + " SECONDS LEFT TO RAISE";
			gg.PokerMaxBet.innerHTML = "2";
			if(2-top.pBet>=1)gg.PokerRaise1.className="vis1";
			if(2-top.pBet>=2)gg.PokerRaise2.className="vis1";
		}
		else if(top.PokerTimer > 60)
		{
			if(top.pToCall!=top.pBet)
			{
				gg.PokerMessage.innerHTML = (top.PokerTimer-60) + " SECONDS LEFT TO CALL";
				gg.PokerCall.className="vis1";
			}
			else
				gg.PokerMessage.innerHTML = (top.PokerTimer-60) + " SECONDS UNTIL THE FLOP";
		}
		else if(top.PokerTimer > 50)
		{
			gg.PokerMessage.innerHTML = (top.PokerTimer-50) + " SECONDS LEFT TO RAISE";
			gg.PokerMaxBet.innerHTML = "4";
			if(4-top.pBet>=1)gg.PokerRaise1.className="vis1";
			if(4-top.pBet>=2)gg.PokerRaise2.className="vis1";
			if(4-top.pBet>=3)gg.PokerRaise3.className="vis1";
		}
		else if(top.PokerTimer > 40)
		{
			if(top.pToCall!=top.pBet)
			{
				gg.PokerMessage.innerHTML = (top.PokerTimer-40) + " SECONDS LEFT TO CALL";
				gg.PokerCall.className="vis1";
			}
			else
				gg.PokerMessage.innerHTML = (top.PokerTimer-40) + " SECONDS UNTIL THE TURN";
		}
		else if(top.PokerTimer > 30)
		{
			gg.PokerMessage.innerHTML = (top.PokerTimer-30) + " SECONDS LEFT TO RAISE";
			gg.PokerMaxBet.innerHTML = "7";
			if(7-top.pBet>=1)gg.PokerRaise1.className="vis1";
			if(7-top.pBet>=2)gg.PokerRaise2.className="vis1";
			if(7-top.pBet>=3)gg.PokerRaise3.className="vis1";
		}
		else if(top.PokerTimer > 20)
		{
			if(top.pToCall!=top.pBet)
			{
				gg.PokerMessage.innerHTML = (top.PokerTimer-20) + " SECONDS LEFT TO CALL";
				gg.PokerCall.className="vis1";
			}
			else
				gg.PokerMessage.innerHTML = (top.PokerTimer-20) + " SECONDS UNTIL THE RIVER";
		}
		else if(top.PokerTimer > 10)
		{
			gg.PokerMessage.innerHTML = (top.PokerTimer-10) + " SECONDS LEFT TO RAISE";
			gg.PokerMaxBet.innerHTML = "10";
			if(10-top.pBet>=1)gg.PokerRaise1.className="vis1";
			if(10-top.pBet>=2)gg.PokerRaise2.className="vis1";
			if(10-top.pBet>=3)gg.PokerRaise3.className="vis1";
		}
		else
		{
			if(top.pToCall!=top.pBet)
			{
				gg.PokerMessage.innerHTML = (top.PokerTimer) + " SECONDS LEFT TO CALL";
				gg.PokerCall.className="vis1";
			}
			else
				gg.PokerMessage.innerHTML = (top.PokerTimer) + " SECONDS UNTIL JUDGEMENT";
		}
	}
}
function genfun(gename)
{
	top.frames.main.document.getElementById("skipform").action.value=gename;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function genfull(gename,ft,fo)
{
	top.frames.main.document.getElementById("skipform").action.value=gename;
	top.frames.main.document.getElementById("skipform").target.value=ft;
	top.frames.main.document.getElementById("skipform").other.value=fo;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function Move(directz)
{
	top.frames.main.document.getElementById("skipform").action.value="move";
	top.frames.main.document.getElementById("skipform").target.value=directz;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function burnit(directz)
{
	top.frames.main.document.getElementById("skipform").action.value="burn";
	top.frames.main.document.getElementById("skipform").target.value=directz;
	pollzero(top.frames.main.document.getElementById("skipform"),1);
}
function TAccept(thenamer,theitemer,thepricer)
{
	top.frames.main.document.getElementById("skipform").action.value="accept";
	top.frames.main.document.getElementById("skipform").target.value=thenamer;
	top.frames.main.document.getElementById("skipform").other.value=theitemer;
	top.frames.main.document.getElementById("skipform").othera.value=thepricer;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function gattack(gatk)
{
	top.frames.main.document.getElementById("skipform").action.value=gatk;
	top.frames.main.document.getElementById("skipform").target.value=top.Target;
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}
function upbuttons()
{
tempstr="";
yes=0;

if(top.Exp >=100)
{
tempstr+="<a href='javascript:level(0)'><img "+top.hio;
if(top.HotLevel==1)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButStr.jpg'></a> ";
tempstr+="<a href='javascript:level(1)'><img "+top.hio;
if(top.HotLevel==2)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButDex.jpg'></a> ";
tempstr+="<a href='javascript:level(2)'><img "+top.hio;
if(top.HotLevel==3)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButAgi.jpg'></a> ";
tempstr+="<a href='javascript:level(3)'><img "+top.hio;
if(top.HotLevel==4)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButDur.jpg'></a> ";
tempstr+="<a href='javascript:level(4)'><img "+top.hio;
if(top.HotLevel==5)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButNtl.jpg'></a> ";
tempstr+="<a href='javascript:level(5)'><img "+top.hio;
if(top.HotLevel==6)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButCnc.jpg'></a> ";
tempstr+="<a href='javascript:level(6)'><img "+top.hio;
if(top.HotLevel==7)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButCnt.jpg'></a> ";
tempstr+="<a href='javascript:level(7)'><img "+top.hio;
if(top.HotLevel==8)tempstr+="width=102 height=54 ";
tempstr+="border=0 src='"+top.y+"ButAll.jpg'></a>";
yes=1;
}
if(top.Health <=0)
{
if(yes) tempstr+="<br>";
yes=1;
tempstr+="<a href='javascript:revive()'><img "+top.hio+"border=0 src='"+top.y+"ButRevive.jpg'></a>";
}

if(top.Target !=-1)
{
if(yes) tempstr+="<br>";
yes=1;
tempstr+="<a href='javascript:gattack(\"attack\")'><img border=0"+top.hio+"src='"+top.y+"ButAttack.jpg' title='Attack With Both Weapons'></a> <a href='javascript:gattack(\"cast\")'><img border=0"+top.hio+"src='"+top.y+"ButCast.jpg' title='Cast With Both Spells'></a> <a href='javascript:gattack(\"lattack\")'><img border=0"+top.hio+"src='"+top.y+"ButHybrid1.jpg' title='Left Weapon and Spell'></a> <a href='javascript:gattack(\"rattack\")'><img border=0"+top.hio+"src='"+top.y+"ButHybrid2.jpg' title='Right Weapon and Spell'></a> <a href='javascript:gattack(\"defend\")'><img border=0"+top.hio+"src='"+top.y+"ButDefend.jpg' title='Defend'></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
if(top.RJ)
	tempstr+="<a href='javascript:gattack(\"rjack\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card24.gif'></a> ";
if(top.BJ)
	tempstr+="<a href='javascript:gattack(\"bjack\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card50.gif'></a> ";
if(top.RQ)
	tempstr+="<a href='javascript:gattack(\"rqueen\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card25.gif'></a> ";
if(top.BQ)
	tempstr+="<a href='javascript:gattack(\"bqueen\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card51.gif'></a> ";
if(top.RK)
	tempstr+="<a href='javascript:gattack(\"rking\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card26.gif'></a> ";
if(top.BK)
	tempstr+="<a href='javascript:gattack(\"bking\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card52.gif'></a> ";
if(top.RA)
	tempstr+="<a href='javascript:gattack(\"race\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card14.gif'></a> ";
if(top.BA)
	tempstr+="<a href='javascript:gattack(\"bace\")'><img border=0"+top.hio+"height=28 width=21 src='"+top.y+"card40.gif'></a> ";
tempstr+=" <img border=0 src='"+top.y+"ButVs.jpg'> <a href=javascript:pm('"+mp(top.Target)+"')>"+getcreature(top.Target)+"</a>";
}

top.frames.main.s_FightWin.innerHTML=tempstr;	
}
function pm(thesubber)
{
if(thesubber.charAt(0) >=0 && thesubber.charAt(0) <=9)
{
domes("Cannot send private messages to creatures.");
return;
}

hl(thesubber);
thenamestring = "/m " + ms(thesubber) + ": ";
thenamestring2 = "/p " + ms(thesubber);
thenamestring3 = "/s " + ms(thesubber);
if(top.frames.main.chat.target.value == thenamestring3)
{
thenamestring = "/ignore " + ms(thesubber);
}
else if(top.frames.main.chat.target.value == thenamestring)
{
thenamestring = thenamestring2;
}
else if(top.frames.main.chat.target.value == thenamestring2)
{
thenamestring = thenamestring3;
}
top.frames.main.chat.target.value=thenamestring;
top.frames.main.chat.target.focus();
top.frames.main.chat.target.value=thenamestring;
top.frames.main.chat.target.focus();

upplayers();
}
function tg(thesubber)
{
	if(thesubber.charAt(0) >=0 && thesubber.charAt(0) <=9)
	{
		top.frames.main.document.getElementById("skipform").action.value="battle";
		top.frames.main.document.getElementById("skipform").target.value=thesubber;
	}
	else
	{
		top.frames.main.document.getElementById("skipform").action.value="duel";
		top.frames.main.document.getElementById("skipform").target.value=thesubber;
	}
	pollzero(top.frames.main.document.getElementById("skipform"),0);
}

function uplastcraftlevel(tisit)
{
top.lastcraftlevel=tisit.selectedIndex;
}

function updatetarget(acttype, inputt,g)
{
	g.other.onchange = null;

	//domes(g);
	if(acttype=="buy")
	{
		subarr=top.multi;
		getitemclass(inputt,subarr,-1)
		subarr=top.hoppb;
		strapper=top.hoppc;
		stradder=top.hoppd;
		overit=top.hoppf;

		if(overit==0)
			amount=subarr.length;
		else
			amount=overit;
		top.frames.main.s_othertext.innerHTML="Item: ";
		g.other.style.display = "inline";

		g.other.length=amount;
		for(i=0;i < amount;i++)
		{
			if(inputt==10)
			{
				price = 0;
				if(i==7 || i==15 || i==23)
					price = 1000000000;
				else if(i>=29)
					price = 2000000000;
				else
				{
					price = 10000;

					subby=top.inventory;
					subamt=subby.length-1;
					for(m=0;m < subamt;m++)
					{
						if(i+10000==subby[m])
						price*=10;
					}

					if(i>=24 && i<=28)price*=2;
				}
				g.other.options[i].text=strapper+subarr[i]+stradder+" "+mc(price);
			}
			else if(inputt<12)
				g.other.options[i].text=strapper+subarr[i]+stradder+" "+mc(TSOT(i));
			else
				g.other.options[i].text=strapper+subarr[i]+stradder+" "+mc(TSOT(i)*2);
			g.other.options[i].value=i;
		}
	}
	else if(acttype=="ts")
	{
		getitemclass(inputt,subarr,-1)
		subarr=top.hoppb;
		strapper=top.hoppc;
		stradder=top.hoppd;
		overit=top.hoppf;

		if(overit==0)
			amount=subarr.length;
		else
			amount=overit;

		if(inputt!=10)
			amount+=10;

		top.frames.main.s_othertext.innerHTML="Item: ";
		g.other.style.display = "inline";

		if(inputt==27)
		{
			g.other.length=3;
			g.other.options[0].text=strapper+subarr[18]+stradder;
			g.other.options[0].value=18;
			g.other.options[1].text=strapper+subarr[19]+stradder;
			g.other.options[1].value=19;
			g.other.options[2].text=strapper+subarr[30]+stradder;
			g.other.options[2].value=30;
		}
		else
		{
			g.other.length=amount;
			for(i=0;i < amount;i++)
			{
				g.other.options[i].text=strapper+subarr[i]+stradder;
				g.other.options[i].value=i;
			}
			if(inputt==10)
			{
				g.other.length+=16;
				igotmilk = 40;
				g.other.options[i].text=strapper+subarr[56]+stradder;
				g.other.options[i++].value=56;
				g.other.options[i].text=strapper+subarr[57]+stradder;
				g.other.options[i++].value=57;
				for(;igotmilk <= 50;i++)
				{
					g.other.options[i].text=strapper+subarr[igotmilk]+stradder;
					g.other.options[i].value=igotmilk;
					igotmilk++;
				}
				g.other.options[i].text=strapper+subarr[60]+stradder;
				g.other.options[i++].value=60;
				g.other.options[i].text=strapper+subarr[54]+stradder;
				g.other.options[i++].value=54;
				g.other.options[i].text=strapper+subarr[53]+stradder;
				g.other.options[i++].value=53;
			}
		}

		if(top.lastcrafttype!=g.target.selectedIndex)
		{
			top.lastcrafttype=g.target.selectedIndex;
			g.other.selectedIndex=top.lastcraftlevel;
		}

		g.other.onchange = function(){uplastcraftlevel(this);};
	}
	else if(acttype=="fight")
	{
		top.lastfought=inputt;
	}
	else if(acttype=="equip")
	{
		upinventory(0,0);
	}
	else if(acttype=="tele")
	{
		s_otheratext.innerHTML="Ntl: "+(dist(top.LocX,g.target.selectedIndex,top.LocY,g.other.selectedIndex)*dist(top.LocX,g.target.selectedIndex,top.LocY,g.other.selectedIndex)*100);

		g.other.onchange = function(){updatetarget(g.action.value,this.options[this.selectedIndex].value,g);};
	}
	else if(acttype=="sail")
	{
		top.frames.main.s_otheratext.innerHTML="Price: "+(dist(top.LocX,top.PortX[g.target.selectedIndex],top.LocY,top.PortY[g.target.selectedIndex])*dist(top.LocX,top.PortX[g.target.selectedIndex],top.LocY,top.PortY[g.target.selectedIndex]));
	}
	else if(acttype=="skills")
	{
		if(inputt==0)
		{
			s_othertext.innerHTML="Amount: ";
			g.other.style.display = "inline";

			g.other.length=100;
			g.other.selectedIndex=top.ExpPerc;
			for(i=0;i<100;i++)
			{
				g.other.options[i].text=i;
				g.other.options[i].value=i;
			}
		}
		else if(inputt==1)
		{
			s_othertext.innerHTML="Skill: ";
			g.other.style.display = "inline";

			g.other.length=13;
			g.other.selectedIndex=top.Skill;
			for(i=0;i<13;i++)
			{
				g.other.options[i].text=top.skillz[i];
				g.other.options[i].value=i;
			}
		}
	}
	else if(acttype=="options")
	{
		if(inputt==0)
		{
			s_othertext.innerHTML="Size: ";
			g.other.style.display = "inline";

			g.other.length=10;
			g.other.selectedIndex=top.ChatSize/10-1;
			for(i=1;i<11;i++)
			{
				g.other.options[i-1].text=i*10;
				g.other.options[i-1].value=i*10;
			}
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==1)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.RelicMode;
			g.other.options[0].text="Verbose";
			g.other.options[0].value=0;
			g.other.options[1].text="Brief";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==2)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.GraphicMode;
			g.other.options[0].text="Automatic";
			g.other.options[0].value=0;
			g.other.options[1].text="Manual";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==3)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.Auction;
			g.other.options[0].text="Enabled";
			g.other.options[0].value=0;
			g.other.options[1].text="Disabled";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==4)
		{
			s_othertext.innerHTML="Stat: ";
			g.other.style.display = "inline";

			g.other.length=9;
			g.other.selectedIndex=top.HotLevel;
			g.other.options[0].text="None (Default)";
			g.other.options[0].value=0;
			g.other.options[1].text="Str";
			g.other.options[1].value=1;
			g.other.options[2].text="Dex";
			g.other.options[2].value=2;
			g.other.options[3].text="Agi";
			g.other.options[3].value=3;
			g.other.options[4].text="Dur";
			g.other.options[4].value=4;
			g.other.options[5].text="Ntl";
			g.other.options[5].value=5;
			g.other.options[6].text="Cnc";
			g.other.options[6].value=6;
			g.other.options[7].text="Cnt";
			g.other.options[7].value=7;
			g.other.options[8].text="All";
			g.other.options[8].value=8;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==5)
		{
			s_othertext.innerHTML="Relic: ";
			g.other.style.display = "inline";

			g.other.length=3;
			g.other.selectedIndex=top.HotCalling;
			g.other.options[0].text="Calling of Cara";
			g.other.options[0].value=0;
			g.other.options[1].text="Calling of Cassius";
			g.other.options[1].value=1;
			g.other.options[2].text="Calling of Lestat";
			g.other.options[2].value=2;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==6)
		{
			s_othertext.innerHTML="Relic: ";
			g.other.style.display = "inline";

			g.other.length=9;
			g.other.selectedIndex=top.HotApprobation;
			g.other.options[0].text="Dexterous Hoist";
			g.other.options[0].value=0;
			g.other.options[1].text="Stream of Conscious";
			g.other.options[1].value=1;
			g.other.options[2].text="Blood Bath";
			g.other.options[2].value=2;
			g.other.options[3].text="Vampiric Leech";
			g.other.options[3].value=3;
			g.other.options[4].text="Death Spike";
			g.other.options[4].value=4;
			g.other.options[5].text="Calling of Cara";
			g.other.options[5].value=5;
			g.other.options[6].text="Calling of Cassius";
			g.other.options[6].value=6;
			g.other.options[7].text="Calling of Lestat";
			g.other.options[7].value=7;
			g.other.options[8].text="Denial of the Believer";
			g.other.options[8].value=8;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==7)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.Emote;
			g.other.options[0].text="Enabled";
			g.other.options[0].value=0;
			g.other.options[1].text="Disabled";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==8)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.Regular;
			g.other.options[0].text="Enabled";
			g.other.options[0].value=0;
			g.other.options[1].text="Disabled";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==9)
		{
			s_othertext.innerHTML="";
			g.other.style.display = "none";
	
			s_otheratext.innerHTML="New Key: ";
			g.othera.style.display = "inline";

			g.othera.value="";
			g.othera.size=32;
		}
		else if(inputt==10)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.Animation;
			g.other.options[0].text="Enabled";
			g.other.options[0].value=0;
			g.other.options[1].text="Disabled";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==11)
		{
			s_othertext.innerHTML="Mode: ";
			g.othera.style.display = "inline";

			g.other.length=4;
			g.other.selectedIndex = 0;
			if(top.AllowYellow==0)
				g.other.selectedIndex=1;
			else if(top.AllowYellow==2)
				g.other.selectedIndex=2;
			else if(top.AllowYellow==3)
				g.other.selectedIndex=3;
			g.other.options[0].text="See No Yellow War Messages";
			g.other.options[0].value=1;
			g.other.options[1].text="See Some Yellow War Messages";
			g.other.options[1].value=0;
			g.other.options[2].text="See All Yellow War Messages";
			g.other.options[2].value=2;
			g.other.options[3].text="See All Yellow & Disable Silence";
			g.other.options[3].value=3;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==12)
		{
			s_othertext.innerHTML="";
			g.other.style.display = "none";
	
			s_otheratext.innerHTML="Pic URL: ";
			g.othera.style.display = "inline";

			g.othera.value="http://ThisIsAnExample.com/yourpic.jpg";
			g.othera.size=80;
		}
		else if(inputt==13)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=!top.AllowInterest;
			g.other.options[0].text="Enabled";
			g.other.options[0].value=1;
			g.other.options[1].text="Disabled";
			g.other.options[1].value=0;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==14)
		{
			s_othertext.innerHTML="Mode: ";
			g.other.style.display = "inline";

			g.other.length=3;
			g.other.selectedIndex=top.AllowTrivial;
			g.other.options[0].text="No Filtering";
			g.other.options[0].value=0;
			g.other.options[1].text="No Trivials";
			g.other.options[1].value=1;
			g.other.options[2].text="No Kingdoms at All";
			g.other.options[2].value=2;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==16)
		{
			s_othertext.innerHTML="Type: ";
			g.other.style.display = "inline";
			
			g.other.length=2;
			g.other.selectedIndex=top.RunePayout;
			g.other.options[0].text="Ash";
			g.other.options[0].value=1;
			g.other.options[1].text="Runes";
			g.other.options[1].value=0;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==17)
		{
			s_othertext.innerHTML="Options: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=0;
			if(!top.GuideRequests)
				g.other.selectedIndex=1;
			g.other.options[0].text="I want to see guide requests!";
			g.other.options[0].value=1;
			g.other.options[1].text="I don't want to see guide requests.";
			g.other.options[1].value=0;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==18)
		{
			s_othertext.innerHTML="Options: ";
			g.other.style.display = "inline";

			g.other.length=2;
			g.other.selectedIndex=top.ShowColors;
			g.other.options[0].text="Hide my kingdoms from map.";
			g.other.options[0].value=0;
			g.other.options[1].text="Show my kingdoms on map.";
			g.other.options[1].value=1;
	
			s_otheratext.innerHTML="";
			g.othera.style.display = "none";
		}
		else if(inputt==19)
		{
			s_othertext.innerHTML="";
			g.other.style.display = "none";
	
			s_otheratext.innerHTML="Pic URL: ";
			g.othera.style.display = "inline";

			g.othera.value="http://ThisIsAnExample.com/yourpic.jpg";
			g.othera.size=80;
			
		}
	}
	else if(acttype=="war" || acttype=="assault")
	{
		if(inputt==4)
		{
			s_otherkingtext.innerHTML="Loc: ";
			g.other.style.display = "inline";

			g.other.length=12;
			g.other.options[0].text="North";
			g.other.options[0].value=0;
			g.other.options[1].text="South";
			g.other.options[1].value=1;
			g.other.options[2].text="East";
			g.other.options[2].value=2;
			g.other.options[3].text="West";
			g.other.options[3].value=3;
			g.other.options[4].text="North North";
			g.other.options[4].value=4;
			g.other.options[5].text="South South";
			g.other.options[5].value=5;
			g.other.options[6].text="East East";
			g.other.options[6].value=6;
			g.other.options[7].text="West West";
			g.other.options[7].value=7;
			g.other.options[8].text="North East";
			g.other.options[8].value=8;
			g.other.options[9].text="North West";
			g.other.options[9].value=9;
			g.other.options[10].text="South East";
			g.other.options[10].value=10;
			g.other.options[11].text="South West";
			g.other.options[11].value=11;
		}
		else
		{
			s_otherkingtext.innerHTML="Loc: ";
			g.other.style.display = "inline";

			g.other.length=4;
			g.other.options[0].text="North";
			g.other.options[0].value=0;
			g.other.options[1].text="South";
			g.other.options[1].value=1;
			g.other.options[2].text="East";
			g.other.options[2].value=2;
			g.other.options[3].text="West";
			g.other.options[3].value=3;
		}
	}
	else if(acttype=="transport")
	{
		if(inputt==5)
		{
			s_otherakingtext.innerHTML="";
			g.othera.style.display = "none";
		}
		else
		{
			s_otherakingtext.innerHTML="Amount: ";
			g.othera.style.display = "inline";

			g.othera.value="";
		}
	}
	else if(acttype=="fortify")
	{
		if(inputt>=0 && inputt<=2)
		{
			s_otherkingtext.innerHTML="Loc: ";
			g.other.style.display = "inline";

			g.other.length=4;
			g.other.options[0].text="North";
			g.other.options[0].value=0;
			g.other.options[1].text="South";
			g.other.options[1].value=1;
			g.other.options[2].text="East";
			g.other.options[2].value=2;
			g.other.options[3].text="West";
			g.other.options[3].value=3;
		}
		else
		{
			s_otherkingtext.innerHTML="(Cost will be 12 times the number you enter)";
			g.other.style.display = "none";
		}
	}
	else if(acttype=="army")
	{
		if(inputt>=0 && inputt<=3)
		{
			s_otherkingtext.innerHTML="";
			g.other.style.display = "none";
		}
		else
		{
			s_otherkingtext.innerHTML="(Cost will be 4 times the number you enter)";
			g.other.style.display = "none";
		}
	}
}
function dist(ex1, ex2, wy1, wy2)
{
	xdif=(ex1-ex2);
	ydif=(wy1-wy2);
	if(xdif<0)xdif=-xdif;
	if(ydif<0)ydif=-ydif;
	return xdif+ydif;
}
function updateaction(inputt,g)
{
	if(g.id == "general")
	{
		top.frames.main.s_targettext.innerHTML="";
		top.frames.main.s_othertext.innerHTML="";
		top.frames.main.s_otheratext.innerHTML="";
	}
	else if(g.id == "king")
	{
		top.frames.main.s_targetkingtext.innerHTML="";
		top.frames.main.s_otherkingtext.innerHTML="";
		top.frames.main.s_otherakingtext.innerHTML="";
	}
	while(g.target.options.length > 0)
		g.target.options.remove(0);
	while(g.other.options.length > 0)
		g.other.options.remove(0);
	g.othera.value="";

	g.target.style.display = "none";
	g.other.style.display = "none";
	g.othera.style.display = "none";

	g.othera.size=9;

	g.target.onchange = function(){updatetarget(g.action.value,this.options[this.selectedIndex].value,g);};
	g.other.onchange = null;
		
	if(inputt=="skills")
	{
		s_targettext.innerHTML="Options: ";
		g.target.style.display = "inline";

		//g.target.options[g.target.options.length] = new Option("Experience Percentage Toward Skills", g.target.options.length);
		//g.target.options[g.target.options.length] = new Option("Current Skill in Practice", g.target.options.length);
		g.target.length=2;
		g.target.options[0].text="Experience Percentage Toward Skills";
		g.target.options[0].value=0;
		g.target.options[1].text="Current Skill in Practice";
		g.target.options[1].value=1;

		updatetarget(inputt,0,g);
	}
	else if(inputt=="move")
	{
		s_targettext.innerHTML="Direction: ";
		g.target.style.display = "inline";

		g.target.length=6;
		g.target.options[0].text="North";
		g.target.options[0].value=0;
		g.target.options[1].text="South";
		g.target.options[1].value=1;
		g.target.options[2].text="East";
		g.target.options[2].value=2;
		g.target.options[3].text="West";
		g.target.options[3].value=3;
		g.target.options[4].text="Up";
		g.target.options[4].value=4;
		g.target.options[5].text="Down";
		g.target.options[5].value=5;
	}
	else if(inputt=="buy" || inputt=="ts")
	{
		s_targettext.innerHTML="Type: ";
		g.target.style.display = "inline";

		g.target.length=26;
		if(inputt=="ts")
			g.target.length=27;
		g.target.options[0].text="Weapon";
		g.target.options[0].value=0;
		g.target.options[1].text="Helmet";
		g.target.options[1].value=1;
		g.target.options[2].text="Shield";
		g.target.options[2].value=2;
		g.target.options[3].text="Gauntlets";
		g.target.options[3].value=3;
		g.target.options[4].text="Mantle";
		g.target.options[4].value=4;
		g.target.options[5].text="Sleeves";
		g.target.options[5].value=5;
		g.target.options[6].text="Damage Spell";
		g.target.options[6].value=6;
		g.target.options[7].text="Leggings";
		g.target.options[7].value=7;
		g.target.options[8].text="Boots";
		g.target.options[8].value=8;
		g.target.options[9].text="Heal Spell";
		g.target.options[9].value=9;
		g.target.options[10].text="Relic";
		g.target.options[10].value=10;
		g.target.options[11].text="Bow";
		g.target.options[11].value=12;
		g.target.options[12].text="Arrow";
		g.target.options[12].value=13;
		g.target.options[13].text="Light Weapons";
		g.target.options[13].value=14;
		g.target.options[14].text="Heavy Weapons";
		g.target.options[14].value=15;
		g.target.options[15].text="Precise Weapons";
		g.target.options[15].value=16;
		g.target.options[16].text="Rapid Damage Spells";
		g.target.options[16].value=17;
		g.target.options[17].text="Major Damage Spells";
		g.target.options[17].value=18;
		g.target.options[18].text="Accurate Damage Spells";
		g.target.options[18].value=19;
		g.target.options[19].text="Durability Helmets";
		g.target.options[19].value=20;
		g.target.options[20].text="Durability Shields";
		g.target.options[20].value=21;
		g.target.options[21].text="Durability Gauntlets";
		g.target.options[21].value=22;
		g.target.options[22].text="Durability Mantles";
		g.target.options[22].value=23;
		g.target.options[23].text="Durability Sleeves";
		g.target.options[23].value=24;
		g.target.options[24].text="Durability Leggings";
		g.target.options[24].value=25;
		g.target.options[25].text="Durability Boots";
		g.target.options[25].value=26;
		if(inputt=="ts")
		{
			g.target.options[26].text="Essence Elements";
			g.target.options[26].value=27;
			if(!top.lastcrafttype)
				top.lastcrafttype = 0;
			g.target.selectedIndex=top.lastcrafttype;
			top.lastcrafttype=-1;
		}

		updatetarget(inputt,g.target.options[g.target.selectedIndex].value,g);
	}
	else if(inputt=="sell" || inputt=="burn")
	{
		s_targettext.innerHTML="Type: ";
		g.target.style.display = "inline";

		upinventory(1,0);
	}
	else if(inputt=="es")
	{
		s_targettext.innerHTML="Item: ";
		g.target.style.display = "inline";
		upinventory(1,1);

		s_othertext.innerHTML="<br>Relic: ";
		g.other.style.display = "inline";

		upinventory(1,0);
	}
	else if(inputt=="ds")
	{
		s_targettext.innerHTML="Item: ";
		g.target.style.display = "inline";

		upinventory(1,0);
	}
	else if(inputt=="equip")
	{
		s_targettext.innerHTML="Item: ";
		g.target.style.display = "inline";

		s_othertext.innerHTML="Slot: ";
		g.other.style.display = "inline";

		upinventory(1,0);
	}
	else if(inputt=="fight")
	{
		s_targettext.innerHTML="Fight: ";
		g.target.style.display = "inline";

		subarr=top.clistcur;
		amount=subarr.length;
		for(i=0;i < amount;i++)
		{
			g.target.options[g.target.options.length] = new Option(subarr[i], i);
		}			
		if(top.lastfought)
			g.target.options.selectedIndex=top.lastfought;
	}
	else if(inputt=="battle")
	{
		s_targettext.innerHTML="Battle: ";
		g.target.style.display = "inline";

		upcreatures();
	}
	else if(inputt=="duel")
	{
		s_targettext.innerHTML="Player: ";
		g.target.style.display = "inline";

		upplayers();		
	}
	else if(inputt=="tele")
	{
		s_targettext.innerHTML="X: ";
		g.target.style.display = "inline";

		g.target.length=300;
		g.target.selectedIndex=top.LocX;
		for(i=0;i < 300;i++)
		{
			g.target.options[i].text=i;
			g.target.options[i].value=i;
		}		

		s_othertext.innerHTML="Y: ";
		g.other.style.display = "inline";

		g.other.length=300;
		g.other.selectedIndex=top.LocY;
		for(i=0;i < 300;i++)
		{
			g.other.options[i].text=i;
			g.other.options[i].value=i;
		}		

		updatetarget(g.action.value,g.action.options[g.action.options.selectedIndex].value,g);
	}
	else if(inputt=="sail")
	{
		s_targettext.innerHTML="Port: ";
		g.target.style.display = "inline";
		g.target.length=30;
		for(i = 0;i<30;i++)
		{
			g.target.options[i].text=top.PortN[i]+" ("+top.PortX[i]+","+top.PortY[i]+")";
			g.target.options[i].value=i;
		}

		s_otheratext.innerHTML="Price: "+(dist(top.LocX,top.PortX[g.target.selectedIndex],top.LocY,top.PortY[g.target.selectedIndex])*dist(top.LocX,top.PortX[g.target.selectedIndex],top.LocY,top.PortY[g.target.selectedIndex]));
	}
	else if(inputt=="give")
	{
		s_targettext.innerHTML="Player: ";
		g.target.style.display = "inline";
		upplayers();		

		s_otheratext.innerHTML="Amount: ";
		g.othera.style.display = "inline";
	}
	else if(inputt=="givek")
	{
		s_targettext.innerHTML="Player: ";
		g.target.style.display = "inline";

		upplayers();		
	}
	else if(inputt=="trade")
	{
		s_targettext.innerHTML="Player: ";
		g.target.style.display = "inline";

		upplayers();		

		s_othertext.innerHTML="Item: ";
		g.other.style.display = "inline";

		upinventory(1,0);

		s_otheratext.innerHTML="Price: ";
		g.othera.style.display = "inline";
	}
	else if(inputt=="viewtops")
	{
		s_targettext.innerHTML="List: ";
		g.target.style.display = "inline";

		g.target.length=32;
		g.target.options[0].text="All Races";
		g.target.options[0].value="a";
		g.target.options[1].text="Guides";
		g.target.options[1].value="g";
		g.target.options[2].text="Dragon Wizard";
		g.target.options[2].value="w";
		g.target.options[3].text="Swimsuits";
		g.target.options[3].value="s";
		g.target.options[4].text="Templars";
		g.target.options[4].value=12;
		g.target.options[5].text="Humans";
		g.target.options[5].value=0;
		g.target.options[6].text="Dwarves";
		g.target.options[6].value=1;
		g.target.options[7].text="Drows";
		g.target.options[7].value=2;
		g.target.options[8].text="Sylvain";
		g.target.options[8].value=3;
		g.target.options[9].text="Galatai";
		g.target.options[9].value=4;
		g.target.options[10].text="Trolls";
		g.target.options[10].value=5;
		g.target.options[11].text="Ogres";
		g.target.options[11].value=6;
		g.target.options[12].text="Goblins";
		g.target.options[12].value=7;
		g.target.options[13].text="Gnomes";
		g.target.options[13].value=8;
		g.target.options[14].text="Solons";
		g.target.options[14].value=9;
		g.target.options[15].text="Mesmers";
		g.target.options[15].value=10;
		g.target.options[16].text="Balacee";
		g.target.options[16].value=11;
		g.target.options[17].text="1000+ Club";
		g.target.options[17].value="1000";
		g.target.options[18].text="Hell Kings";
		g.target.options[18].value="Hel";
		g.target.options[19].text="Dungeon Kings";
		g.target.options[19].value="Dun";
		g.target.options[20].text="Surface Kings";
		g.target.options[20].value="Sur";
		g.target.options[21].text="Sky Kings";
		g.target.options[21].value="Sky";
		g.target.options[22].text="Heaven Kings";
		g.target.options[22].value="Hev";
		g.target.options[23].text="Forge Kings";
		g.target.options[23].value="For";
		g.target.options[24].text="Top Focused Crafters";
		g.target.options[24].value="focused";
		g.target.options[25].text="Top Overall Crafters";
		g.target.options[25].value="overall";
		g.target.options[26].text="Hell Kingdom Map";
		g.target.options[26].value="mhel";
		g.target.options[27].text="Dungeon Kingdom Map";
		g.target.options[27].value="mdun";
		g.target.options[28].text="Surface Kingdom Map";
		g.target.options[28].value="msur";
		g.target.options[29].text="Sky Kingdom Map";
		g.target.options[29].value="msky";
		g.target.options[30].text="Heaven Kingdom Map";
		g.target.options[30].value="mhev";
		g.target.options[31].text="Forge Kingdom Map";
		g.target.options[31].value="mfor";
	}
	else if(inputt=="options")
	{
		s_targettext.innerHTML="Option: ";
		g.target.style.display = "inline";

		g.target.length=19;
		g.target.options[0].text="Chat Size";
		g.target.options[0].value=0;
		g.target.options[1].text="Relic Display";
		g.target.options[1].value=1;
		g.target.options[2].text="Graphic Window Update";
		g.target.options[2].value=2;
		g.target.options[3].text="Auction Text";
		g.target.options[3].value=3;
		g.target.options[4].text="Emote Text";
		g.target.options[4].value=7;
		g.target.options[5].text="Shout Text";
		g.target.options[5].value=8;
		g.target.options[6].text="Button Enlargement";
		g.target.options[6].value=4;
		g.target.options[7].text="Preferred Blessing";
		g.target.options[7].value=5;
		g.target.options[8].text="Preferred Approbation";
		g.target.options[8].value=6;
		g.target.options[9].text="Change Account Key";
		g.target.options[9].value=9;
		g.target.options[10].text="Animated Gif's";
		g.target.options[10].value=10;
		g.target.options[11].text="War Message Filtering";
		g.target.options[11].value=11;
		g.target.options[12].text="Your Picture";
		g.target.options[12].value=12;
		g.target.options[13].text="Interest & Starving Filtering";
		g.target.options[13].value=13;
		g.target.options[14].text="Trivial Gold/Kingdom Filtering";
		g.target.options[14].value=14;
		g.target.options[15].text="Poker Payout";
		g.target.options[15].value=16;
		g.target.options[16].text="Be a Guide? (Ash rewards!)";
		g.target.options[16].value=17;
		g.target.options[17].text="Kingdom Map Colors";
		g.target.options[17].value=18;
		g.target.options[18].text="Swimsuit Picture";
		g.target.options[18].value=19;

		updatetarget(inputt,0,g);
	}
	else if(inputt=="settle" || inputt=="coup")
	{
	}
	else if(inputt=="bribe" || inputt=="pay" || inputt=="tax" || inputt=="food" || inputt=="embezzle" || inputt=="deposit")
	{
		s_otherakingtext.innerHTML="Amount: ";
		g.othera.style.display = "inline";
	}
	else if(inputt=="rune")
	{
		s_otherakingtext.innerHTML="Amount (Runes cost 1 billion each): ";
		g.othera.style.display = "inline";
	}
	else if(inputt=="guard")
	{
		s_targetkingtext.innerHTML="Beast: ";
		g.target.style.display = "inline";

		subarr=top.clistcur;
		amount=subarr.length;
		g.target.length=amount;
		for(i=0;i < amount;i++)
		{
			g.target.options[i].text=subarr[i]+" "+mc(TSOT(i));
			g.target.options[i].value=i;
		}		
	}
	else if(inputt=="army")
	{
		s_targetkingtext.innerHTML="Unit: ";
		g.target.style.display = "inline";

		g.target.length=5;
		g.target.options[0].text="Soldiers";
		g.target.options[0].value=0;
		g.target.options[1].text="Archers";
		g.target.options[1].value=1;
		g.target.options[2].text="Catapults";
		g.target.options[2].value=2;
		g.target.options[3].text="Trebuchets";
		g.target.options[3].value=3;
		g.target.options[4].text="ALL";
		g.target.options[4].value=4;

		s_otherakingtext.innerHTML="Amount: ";
		g.othera.style.display = "inline";
	}
	else if(inputt=="fortify")
	{
		s_targetkingtext.innerHTML="Type: ";
		g.target.style.display = "inline";

		g.target.length=4;
		g.target.options[0].text="Walls";
		g.target.options[0].value=0;
		g.target.options[1].text="Moats";
		g.target.options[1].value=1;
		g.target.options[2].text="Cannons";
		g.target.options[2].value=2;
		g.target.options[3].text="ALL";
		g.target.options[3].value=3;

		updatetarget(inputt,0,g);

		s_otherakingtext.innerHTML="Amount: ";
		g.othera.style.display = "inline";
	}
	else if(inputt=="war" || inputt=="assault")
	{
		s_targetkingtext.innerHTML="With: ";
		g.target.style.display = "inline";

		g.target.length=1;
		g.target.length=5;
		g.target.options[0].text="Everything";
		g.target.options[0].value=0;
		g.target.options[1].text="Soldiers";
		g.target.options[1].value=1;
		g.target.options[2].text="Archers";
		g.target.options[2].value=2;
		g.target.options[3].text="Catapults";
		g.target.options[3].value=3;
		g.target.options[4].text="Trebuchets";
		g.target.options[4].value=4;

		s_otherkingtext.innerHTML="Loc: ";
		g.other.style.display = "inline";

		g.other.length=4;
		g.other.options[0].text="North";
		g.other.options[0].value=0;
		g.other.options[1].text="South";
		g.other.options[1].value=1;
		g.other.options[2].text="East";
		g.other.options[2].value=2;
		g.other.options[3].text="West";
		g.other.options[3].value=3;
	}
	else if(inputt=="transport")
	{
		s_targetkingtext.innerHTML="What: ";
		g.target.style.display = "inline";

		g.target.length=6;
		g.target.options[0].text="Everything";
		g.target.options[0].value=0;
		g.target.options[1].text="Soldiers";
		g.target.options[1].value=1;
		g.target.options[2].text="Archers";
		g.target.options[2].value=2;
		g.target.options[3].text="Catapults";
		g.target.options[3].value=3;
		g.target.options[4].text="Trebuchets";
		g.target.options[4].value=4;
		g.target.options[5].text="Guard";
		g.target.options[5].value=5;

		s_otherkingtext.innerHTML="Loc: ";
		g.other.style.display = "inline";

		g.other.length=4;
		g.other.options[0].text="North";
		g.other.options[0].value=0;
		g.other.options[1].text="South";
		g.other.options[1].value=1;
		g.other.options[2].text="East";
		g.other.options[2].value=2;
		g.other.options[3].text="West";
		g.other.options[3].value=3;

		s_otherakingtext.innerHTML="Amount: ";
		g.othera.style.display = "inline";
	}
}
function domes(sss)
{
upchat(79+"<"+sss+"|");
}
function il(s)
{
for(jkl=0;jkl<20;jkl++)
{
if(top.ignorelist[jkl]==s)
{
	top.ignorelist[jkl]="";
	domes(s+" removed from ignore list.");
		return;
}
}
if(s=="glitchless" || s=="glitchless2")
{
domes("Just say 'No' to stupidity.");
return;
}
for(jkl=0;jkl<20;jkl++)
{
if(top.ignorelist[jkl]=="")
{
	top.ignorelist[jkl]=s;
	domes(s+" added to ignore list.");
	return;
}
}
domes(s+" added to ignore list and "+top.ignorelist[19]+" removed due to 20 person max.");
for(jkl=19;jkl > 0;jkl--)
top.ignorelist[jkl]=top.ignorelist[jkl-1];
top.ignorelist[0]=s;
}
function hl(s)
{
flag=0;
for(i=0;i<20;i++)
{
if(top.hotlist[i]==s)
	flag=1;
}
if(flag==0)
{
for(i=19;i > 0;i--)
	top.hotlist[i]=top.hotlist[i-1];
top.hotlist[0]=s;
}

subarr=top.hotlist;
amount=subarr.length;
chat.other.length=1;
chat.other.length=amount+4;
chat.other.options[0].text="SHOUT";
chat.other.options[0].value=0;
chat.other.options[1].text="KINGDOM";
chat.other.options[1].value=1;
chat.other.options[2].text="AUCTION";
chat.other.options[2].value=2;
chat.other.options[3].text="EMOTE";
chat.other.options[3].value=3;
for(i=0;i < amount;i++)
{
if(subarr[i]=="R")
{
	chat.other.length=chat.other.length-(amount-i);
	return;
}
chat.other.options[i+4].text=ms(subarr[i]);
chat.other.options[i+4].value=subarr[i];
}
}
function mn(s)
{
if(s==null)
return s;
ns="";
for(z=0;z < s.length;z++)
{
if(s.charAt(z)=="+")ns+=" ";
else if(s.charAt(z)=="A")ns+="a";
else if(s.charAt(z)=="B")ns+="b";
else if(s.charAt(z)=="C")ns+="c";
else if(s.charAt(z)=="D")ns+="d";
else if(s.charAt(z)=="E")ns+="e";
else if(s.charAt(z)=="F")ns+="f";
else if(s.charAt(z)=="G")ns+="g";
else if(s.charAt(z)=="H")ns+="h";
else if(s.charAt(z)=="I")ns+="i";
else if(s.charAt(z)=="J")ns+="j";
else if(s.charAt(z)=="K")ns+="k";
else if(s.charAt(z)=="L")ns+="l";
else if(s.charAt(z)=="M")ns+="m";
else if(s.charAt(z)=="N")ns+="n";
else if(s.charAt(z)=="O")ns+="o";
else if(s.charAt(z)=="P")ns+="p";
else if(s.charAt(z)=="Q")ns+="q";
else if(s.charAt(z)=="R")ns+="r";
else if(s.charAt(z)=="S")ns+="s";
else if(s.charAt(z)=="T")ns+="t";
else if(s.charAt(z)=="U")ns+="u";
else if(s.charAt(z)=="V")ns+="v";
else if(s.charAt(z)=="W")ns+="w";
else if(s.charAt(z)=="X")ns+="x";
else if(s.charAt(z)=="Y")ns+="y";
else if(s.charAt(z)=="Z")ns+="z";
else if(s.charAt(z)==":")break;
else ns+=s.charAt(z);
}
return ns;
}
function ms(s)
{
if(s==null)
return s;
ns="";
for(z=0;z < s.length;z++)
{
if(s.charAt(z)=="+")ns+=" ";
else ns+=s.charAt(z);
}
return ns;
}
function mp(s)
{
if(s==null)
return s;
ns="";
for(z=0;z < s.length;z++)
{
if(s.charAt(z)==" ")ns+="+";
else ns+=s.charAt(z);
}
return ns;
}
function mc(s)
{
if(parseInt(s,10)==NaN || s=="undefined" || s==null)
return s;
ns="";
njf=0;
for(z=(s.toString()).length-1;z > 0;z--)
{
ns=(s.toString()).charAt(z) + ns;
if(njf++==2)
{
	njf=0;
	ns="," + ns;
}
}
ns=(s.toString()).charAt(0) + ns;
return ns;
}
function upplayers()
{
	if(top.Players=="" || top.Players==null || top.Players=="-")
		top.players=["","NOBODY",""];
	else
		top.players=top.Players.split("-");

	inputt=top.frames.main.document.getElementById('general').action.value;
	g=top.frames.main.document.getElementById('general');

	storedname = "";
	if(inputt=="duel" || inputt=="give" || inputt=="trade" || inputt=="givek")
	{
		if(g.target.selectedIndex >= 0 && g.target.selectedIndex < g.target.length)
			storedname = g.target.options[g.target.selectedIndex].value.toString();
		g.target.selectedIndex = 0;
		subarr=top.players;
		amount=subarr.length-1;
		g.target.length=amount-1;
		for(i=1;i < amount;i++)
		{
			g.target.options[i-1].text=ms(subarr[i]);
			g.target.options[i-1].value=subarr[i];
		}
	}
	if(inputt=="give" || inputt=="trade" || inputt=="givek")
	{
		templen = g.target.length;
		subarr=top.hotlist;
		amount=subarr.length;
		g.target.length=g.target.length+amount;
		for(i=0;i < amount;i++)
		{
			if(subarr[i]=="R")
			{
				g.target.length=g.target.length-(amount-i);
				break;
			}
			g.target.options[i+templen].text=ms(subarr[i]);
			g.target.options[i+templen].value=subarr[i];
		}
	}
	if(storedname != "")
	{
		for(i = 0;i < g.target.length;i++)
		{
			if(storedname == g.target.options[i].value.toString())
			{
				g.target.selectedIndex = i;
				break;
			}
		}
	}
}
function getitempic(itemnumber)
{
	if(itemnumber==-1)
		return "c.gif";
	itype=parseInt(itemnumber/1000,10)%100;
	inum=parseInt(itemnumber,10)%1000;
	if(itype >= 14 && itype <= 16)
		itype=0;
	if(itype >= 17 && itype <= 19)
		itype=6;
	if(itype>=20 && itype<=24)
		itype-=19;
	if(itype>=25 && itype<=26)
		itype-=18;

	if(inum<70)
	{
		if(itype !=10)
			inum=(parseInt(inum/10,10)*10+9);
		else
		{
			if(inum < 23)
				inum=(parseInt(inum/8,10)*8+7);
			else if(inum <=44)
				inum=inum;
			else
			{
				inum-=22;
				if(inum > 44)
					inum-=8;
			}
		}
	}
	else if(inum < 75 && itype != 10)
	{
		if(!(itype == 0 || itype == 12 || itype == 6))
			inum = 69;
	}
	else if(inum < 80)
	{
		inum=79;
	}
	else
	{
		if(itype == 10)
			inum = 80;
	}

	return (itype.toString()+"_"+inum+".jpg");
}
function getitemclass(hoppa,hoppb,hoppe)
{
hoppf=70;
hoppc="";
hoppd="";
hoppb=top.multi;
if(hoppa==0)
{
hoppb=top.weapons;
hoppc="";
hoppd="";
}
else if(hoppa==1)
{
hoppb=top.multi;
hoppc="";
hoppd=" Helmet";
}
else if(hoppa==2)
{
hoppb=top.multi;
hoppc="";
hoppd=" Shield";
}
else if(hoppa==3)
{
hoppb=top.multi;
hoppc="";
hoppd=" Gauntlets";
}
else if(hoppa==4)
{
hoppb=top.multi;
hoppc="";
hoppd=" Mantle";
}
else if(hoppa==5)
{
hoppb=top.multi;
hoppc="";
hoppd=" Sleeves";
}
else if(hoppa==6)
{
hoppb=top.hurts;
hoppc="";
hoppd="";
}
else if(hoppa==7)
{
hoppb=top.multi;
hoppc="";
hoppd=" Leggings";
}
else if(hoppa==8)
{
hoppb=top.multi;
hoppc="";
hoppd=" Boots";
}
else if(hoppa==9)
{
hoppb=top.heals;
hoppc="";
hoppd="";
}
else if(hoppa==10)
{
hoppb=top.relics;
hoppc="";
hoppd="";
hoppf=36;
}
else if(hoppa==12)
{
hoppb=top.multi;
hoppc="";
hoppd=" Bow";
}
else if(hoppa==13)
{
hoppb=top.multi;
hoppc="";
hoppd=" Arrow";
}
else if(hoppa==14)
{
hoppb=top.weapons;
hoppc="Light ";
hoppd="";
}
else if(hoppa==15)
{
hoppb=top.weapons;
hoppc="Heavy ";
hoppd="";
}
else if(hoppa==16)
{
hoppb=top.weapons;
hoppc="Precise ";
hoppd="";
}
else if(hoppa==17)
{
hoppb=top.hurts;
hoppc="Rapid ";
hoppd="";
}
else if(hoppa==18)
{
hoppb=top.hurts;
hoppc="Major ";
hoppd="";
}
else if(hoppa==19)
{
hoppb=top.hurts;
hoppc="Accurate ";
hoppd="";
}
else if(hoppa==20)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Helmet";
}
else if(hoppa==21)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Shield";
}
else if(hoppa==22)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Gauntlets";
}
else if(hoppa==23)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Mantle";
}
else if(hoppa==24)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Sleeves";
}
else if(hoppa==25)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Leggings";
}
else if(hoppa==26)
{
hoppb=top.multi;
hoppc="Durability ";
hoppd=" Boots";
}
else if(hoppa==27)
{
hoppb=top.elements;
hoppc="Essence Element of ";
hoppd="";
}
else
{
hoppb=top.specials;
hoppc="";
hoppd="";
}

if(hoppe>=0)
{
hoppd+=" *";
hoppd+=top.relics[iench];
hoppd+="*";
}
top.hoppa=hoppa;
top.hoppb=hoppb;
top.hoppc=hoppc;
top.hoppd=hoppd;
top.hoppe=hoppe;
top.hoppf=hoppf;
}
function getitem(itemnumber)
{
if(itemnumber==-1)
return "Nothing";
var item;
itype=parseInt(itemnumber/1000,10)%100;
inum=parseInt(itemnumber,10)%1000;
iench=parseInt(itemnumber/100000,10)%100-1;

getitemclass(itype,item,iench);
item=top.hoppb;
strapper=top.hoppc;
stradder=top.hoppd;

return (strapper+item[inum]+stradder);
}
function getcreature(cretnum)
{
if(!(cretnum.charAt(0) >=0 && cretnum.charAt(0) <=9))
return ms(cretnum);
ctype=parseInt(cretnum/100,10)%1000;
cid=cretnum%100;
if(ctype==999)
return "The GUARD";
if(ctype>69)
{
blehblah = top.clistS;
ctype-=70;
if(blehblah[ctype].charAt(0)=="A" || blehblah[ctype].charAt(0)=="E" || blehblah[ctype].charAt(0)=="I" || blehblah[ctype].charAt(0)=="O" || blehblah[ctype].charAt(0)=="U")
	return "AN " + blehblah[ctype];
else
	return "A " + blehblah[ctype];
}
if(top.LocX==100 && top.LocY==200 && top.LocZ=="Dun")return "an InSaNe "+top.clistcur[ctype];
if(top.clistcur[ctype].charAt(0)=="A" || top.clistcur[ctype].charAt(0)=="E" || top.clistcur[ctype].charAt(0)=="I" || top.clistcur[ctype].charAt(0)=="O" || top.clistcur[ctype].charAt(0)=="U")
return "an " + top.clistcur[ctype];
else
return "a " + top.clistcur[ctype];
}
function upcreatures()
{
	if(top.Creatures=="" || top.Creatures==null || top.Creatures=="-")
		top.creatures=["","NONE",""];
	else
		top.creatures=top.Creatures.split("-");

	inputt=top.frames.main.document.getElementById('general').action.value;
	g=top.frames.main.document.getElementById('general');

	if(inputt=="battle")
	{
		subarr=top.creatures;
		amount=subarr.length-1;
		g.target.length=amount-1;
		for(i=1;i < amount;i++)
		{
			g.target.options[i-1].text=ms(getcreature(subarr[i]));
			g.target.options[i-1].value=subarr[i];
		}
	}
}
function upinventory(shouldi,ughi)
{
	if(top.Inventory=="" || top.Inventory==null)
		top.inventory=["EMPTY",""];
	else
		top.inventory=top.Inventory.split("-");

	inputt=top.frames.main.document.getElementById('general').action.value;
	g=top.frames.main.document.getElementById('general');
	var itemtog=[];
	itemtog[0]=top.Weapon;
	itemtog[1]=top.Shield;
	itemtog[2]=top.Gauntlets;
	itemtog[3]=top.Mantle;
	itemtog[4]=top.Sleeves;
	itemtog[5]=top.Cast;
	itemtog[6]=top.Leggings;
	itemtog[7]=top.Boots;
	itemtog[8]=top.Heal;
	itemtog[9]=top.Relic1;
	itemtog[10]=top.Relic2;
	itemtog[11]=top.Relic3;
	itemtog[12]=top.Relic4;
	itemtog[13]=top.Relic5;
	itemtog[14]=top.Relic6;
	itemtog[15]=top.Helmet;

	if(inputt=="equip" || inputt=="trade" || inputt=="sell" || inputt=="burn" || inputt=="ds" || inputt=="es")
	{
		if(shouldi!=0)
		{
			if(inputt=="equip" || inputt=="sell" || inputt=="burn" || inputt=="ds" || ughi==1)
				h=g.target;
			else
				h=g.other;

			top.stickiinv=h.selectedIndex;

			subarr=top.inventory;
			lasttype=99;
			amount=subarr.length-1;
			if(amount==1)
			{
				amount=2;
				subarr[1]=-1;
			}
			h.length=amount-1;
			displace=0;
			for(i=1;i < amount+displace;i++)
			{
				skipit=0;
				for(x=0;x<16;x++)
				{
					if(itemtog[x]=="Nothing")continue;
					if(itemtog[x]==subarr[i-displace])
					{
						itemtog[x]="Nothing";
						skipit=1;
						break;
					}
				}
				itype=parseInt(subarr[i-displace]/1000,10)%100;
				if(lasttype!=itype)
				{
					displace++;
					h.length=h.length+1;
					if(itype==0)
						h.options[i-1].text="Weapons";
					else if(itype==1)
						h.options[i-1].text="Helmets";
					else if(itype==2)
						h.options[i-1].text="Shields";
					else if(itype==3)
						h.options[i-1].text="Gauntlets";
					else if(itype==4)
						h.options[i-1].text="Mantles";
					else if(itype==5)
						h.options[i-1].text="Sleeves";
					else if(itype==6)
						h.options[i-1].text="Damage Spells";
					else if(itype==7)
						h.options[i-1].text="Leggings";
					else if(itype==8)
						h.options[i-1].text="Boots";
					else if(itype==9)
						h.options[i-1].text="Heal Spells";
					else if(itype==10)
						h.options[i-1].text="Relics";
					else if(itype==11)
						h.options[i-1].text="Others";
					else if(itype==12)
						h.options[i-1].text="Bows";
					else if(itype==13)
						h.options[i-1].text="Arrows";
					else if(itype==14)
						h.options[i-1].text="Light Weapons";
					else if(itype==15)
						h.options[i-1].text="Heavy Weapons";
					else if(itype==16)
						h.options[i-1].text="Precise Weapons";
					else if(itype==17)
						h.options[i-1].text="Rapid Damage Spells";
					else if(itype==18)
						h.options[i-1].text="Major Damage Spells";
					else if(itype==19)
						h.options[i-1].text="Accurate Damage Spells";
					else if(itype==20)
						h.options[i-1].text="Durability Helmets";
					else if(itype==21)
						h.options[i-1].text="Durability Shields";
					else if(itype==22)
						h.options[i-1].text="Durability Gauntlets";
					else if(itype==23)
						h.options[i-1].text="Durability Mantles";
					else if(itype==24)
						h.options[i-1].text="Durability Sleeves";
					else if(itype==25)
						h.options[i-1].text="Durability Leggings";
					else if(itype==26)
						h.options[i-1].text="Durability Boots";
					else if(itype==27)
						h.options[i-1].text="Essence Elements";
					h.options[i-1].text="__________________"+h.options[i-1].text+"__________________";
					h.options[i-1].value=999999999;
					i++;
				}
				lasttype = itype;
				if(skipit)
					h.options[i-1].text=getitem(subarr[i-displace])+ " (EQUIPPED)";
				else
					h.options[i-1].text=getitem(subarr[i-displace]);
				h.options[i-1].value=subarr[i-displace];
			}
		}
		if(shouldi!=0)
		{
			if(top.stickiinv < 0)
				top.stickiinv=0;
			if(top.stickiinv >= h.length)
				top.stickiinv=h.length-1;
			h.selectedIndex=top.stickiinv;
		}
		if(inputt!="equip")
			return;
		itype=parseInt(g.target.options[g.target.selectedIndex].value/1000,10)%100;

		tmpchar=g.target.options[g.target.selectedIndex].text;
		if(tmpchar.charAt(tmpchar.length-1) == ")")
		{
			g.other.length=1;
			g.other.options[0].text="UNEQUIP";
			g.other.options[0].value=11;
		}
		else if(itype==1 || itype==3 || itype==4 || itype==5 || itype==7 || itype==8 || itype==20 || itype==22 || itype==23 || itype==24 || itype==25 || itype==26)
		{
			g.other.length=1;
			g.other.options[0].text="AUTO";
			g.other.options[0].value=0;
		}
		else if(itype==0 || itype==2 || itype==12 || itype==13 || itype==14 || itype==15 || itype==16 || itype==21)
		{
			g.other.length=2;
			g.other.options[0].text="Left Hand";
			g.other.options[0].value=1;
			g.other.options[1].text="Right Hand";
			g.other.options[1].value=2;
		}
		else if(itype==6 || itype==9 || itype==17 || itype==18 || itype==19)
		{
			g.other.length=2;
			g.other.options[0].text="Spell One";
			g.other.options[0].value=3;
			g.other.options[1].text="Spell Two";
			g.other.options[1].value=4;
		}
		else if(itype==10)
		{
			g.other.length=6;
			g.other.options[0].text="Relic 1";
			g.other.options[0].value=5;
			g.other.options[1].text="Relic 2";
			g.other.options[1].value=6;
			g.other.options[2].text="Relic 3";
			g.other.options[2].value=7;
			g.other.options[3].text="Relic 4";
			g.other.options[3].value=8;
			g.other.options[4].text="Relic 5";
			g.other.options[4].value=9;
			g.other.options[5].text="Relic 6";
			g.other.options[5].value=10;
		}
		else
		{
			g.other.length=1;
			g.other.options[0].text="UNEQUIPABLE";
			g.other.options[0].value=0;
		}
	}
}
function up(istring,lastaction)
{
	if(!lastaction)
		top.LastAction = top.PendingLastAction;
	else
		top.LastAction = lastaction;

	if(top.ShowText) domes(istring);
	didit = 0;
	if(top.LastAction == "poll") didit = 1;
	else
	{
		top.frames.main.s_chatbut.style.display = top.frames.main.s_subbut2.style.display = top.frames.main.s_subbut.style.display = "inline";
		top.frames.main.s_chatbutNO.style.display = top.frames.main.s_subbut2NO.style.display = top.frames.main.s_subbutNO.style.display = "none";
	}
	if(top.LastAction != "poll" && top.LastAction != "chat")
	{
		top.dActionDelay = 0;
		top.ActionDelay = 0;
		top.frames.main.s_Response.innerHTML = "";
	}
	if(top.LastAction == "chat")
	{
		didit = 1;
		top.frames.main.chat.target.value = "";
		top.frames.main.chat.target.focus();
	}
	top.Update = 0;
	if(istring == "" || istring == null) return;
	upwin = -1;
	it = istring.split(" ");
	varnum = 0;
	while(varnum < it.length - 1)
	{
		code = it[varnum++];
		o = it[varnum++];
		if(code == "0")
		{
			top.frames.main.s_Str.innerHTML = mc(o);
			top.Str = o;
			top.UpdateLevel = 1;
		}
		else if(code == "1")
		{
			top.frames.main.s_Dex.innerHTML = mc(o);
			top.Dex = o;
			top.UpdateLevel = 1;
		}
		else if(code == "2")
		{
			top.frames.main.s_Agi.innerHTML = mc(o);
			top.Agi = o;
			top.UpdateLevel = 1;
		}
		else if(code == "3")
		{
			top.frames.main.s_Ntl.innerHTML = mc(o);
			top.Ntl = o;
			top.UpdateLevel = 1;
		}
		else if(code == "4")
		{
			top.frames.main.s_Cnc.innerHTML = mc(o);
			top.Cnc = o;
			top.UpdateLevel = 1;
		}
		else if(code == "5")
		{
			top.frames.main.s_Cnt.innerHTML = mc(o);
			top.Cnt = o;
			top.UpdateLevel = 1;
		}
		else if(code == "6")
		{
			top.frames.main.s_Dur.innerHTML = mc(o);
			top.Dur = o;
			top.UpdateLevel = 1;
		}
		else if(code == "7")
		{
			top.Health = o;
			upbars();
		}
		else if(code == "8")
		{
			top.Exp = o;
			HPerc = o % 100;
			top.frames.main.s_Exp.innerHTML = "<table border=0 width=100% cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "ml.jpg'></td><td width=" + HPerc + "% background='" + top.y + "mfy.jpg' align=right></td><td width=" + (100 - HPerc) + "% background='" + top.y + "mee.jpg'></td><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "mr.jpg'></td></tr></table>";
		}
		else if(code == "9")
		{
			top.frames.main.s_Gold.innerHTML = mc(o);
			top.Gold = o;
		}
		else if(code == "10")
		{
			top.frames.main.s_Loc.innerHTML = o;
			top.Loc = o;
			locsplit = top.Loc.split(",");
			top.LocX = locsplit[0];
			top.LocZ = locsplit[1];
			top.LocY = locsplit[2];
			oldlist = top.clistcur;
			if(top.LocZ == "Sur") top.clistcur = top.clista;
			else if(top.LocZ == "Dun") top.clistcur = top.clistb;
			else if(top.LocZ == "Sky") top.clistcur = top.clistc;
			else if(top.LocZ == "Hel") top.clistcur = top.clistd;
			else if(top.LocZ == "Hev") top.clistcur = top.cliste;
			else if(top.LocZ == "For") top.clistcur = top.clistf;
			upwin = 2;
			if(oldlist != top.clistcur || top.frames.main.document.getElementById('general').action.options.selectedIndex == 5) top.frames.main.updateaction(top.frames.main.document.getElementById('general').action.options[top.frames.main.document.getElementById('general').action.options.selectedIndex].value, top.frames.main.document.getElementById('general'));
		}
		else if(code == "11")
		{
			top.RaceSex = o;
			upwin = 0;
		}
		else if(code == "12")
		{
			top.Weapon = o;
			top.WeaponPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "13")
		{
			top.Shield = o;
			top.ShieldPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "14")
		{
			top.Gauntlets = o;
			top.GauntletsPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "15")
		{
			top.Mantle = o;
			top.MantlePic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "16")
		{
			top.Sleeves = o;
			top.SleevesPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "17")
		{
			top.Cast = o;
			top.CastPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "18")
		{
			top.Leggings = o;
			top.LeggingsPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "19")
		{
			top.Boots = o;
			top.BootsPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "20")
		{
			top.Heal = o;
			top.HealPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "21")
		{
			top.Relic1 = o;
			top.Relic1Pic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "22")
		{
			top.Relic2 = o;
			top.Relic2Pic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "23")
		{
			top.Relic3 = o;
			top.Relic3Pic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "24")
		{
			top.Relic4 = o;
			top.Relic4Pic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "25")
		{
			top.Relic5 = o;
			top.Relic5Pic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "26")
		{
			top.Relic6 = o;
			top.Relic6Pic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "27")
		{
			top.Helmet = o;
			top.HelmetPic = getitempic(o);
			upwin = 1;
			upinventory(1, 0);
		}
		else if(code == "28")
		{
			top.Ench10 = o % 100;
			if(o == -1) o = 0;
			top.Mnch10 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank10 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "30")
		{
			top.ChatSize = o % 1000;
			if(top.ChatSize < 10) top.ChatSize = 10;
			top.RelicMode = getdigit(o, 3);
			top.GraphicMode = getdigit(o, 4);
			top.Auction = getdigit(o, 5);
			top.HotLevel = getdigit(o, 6);
			top.HotCalling = getdigit(o, 7);
			top.HotApprobation = getdigit(o, 8);
		}
		else if(code == "31")
		{
			top.Ench1 = o % 100;
			if(o == -1) o = 0;
			top.Mnch1 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank1 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "32")
		{
			top.Ench2 = o % 100;
			if(o == -1) o = 0;
			top.Mnch2 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank2 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "33")
		{
			top.Ench3 = o % 100;
			if(o == -1) o = 0;
			top.Mnch3 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank3 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "34")
		{
			top.Ench4 = o % 100;
			if(o == -1) o = 0;
			top.Mnch4 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank4 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "35")
		{
			top.Ench5 = o % 100;
			if(o == -1) o = 0;
			top.Mnch5 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank5 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "36")
		{
			top.Ench6 = o % 100;
			if(o == -1) o = 0;
			top.Mnch6 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank6 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "37")
		{
			top.Ench7 = o % 100;
			if(o == -1) o = 0;
			top.Mnch7 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank7 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "38")
		{
			top.Ench8 = o % 100;
			if(o == -1) o = 0;
			top.Mnch8 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank8 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "39")
		{
			top.Ench9 = o % 100;
			if(o == -1) o = 0;
			top.Mnch9 = Math.floor(parseInt(o,10)/100)%100;
			top.MnchRank9 = Math.floor(parseInt(o,10)/10000)%100;
			upwin = 1;
		}
		else if(code == "40")
		{
			top.ActionDelay=o;
			if(top.ActionDelay <=0)top.ActionDelay=1;
			top.ActionInc=o;
			setTimeout("top.frames.main.updelay()","50");
			didit = 1;
		}
		else if(code == "41")
		{
			top.ExpPerc = o;
		}
		else if(code == "42")
		{
			top.Skill = o;
		}
		else if(code == "43")
		{
			top.Emote = getdigit(o, 0);
			top.Regular = getdigit(o, 1);
			top.Animation = getdigit(o, 2);
			top.AllowYellow = getdigit(o, 3);
			top.AllowInterest = getdigit(o, 4);
			top.AllowTrivial = getdigit(o, 5);
			if(top.PokerLive != getdigit(o, 6))
			{
				top.PokerLive = getdigit(o, 6);
				if(top.PokerLive)
				{
					top.frames.main.pokertable.style.visibility = "visible";
					upoker();
					top.frames.main.s_ButtFunk.innerHTML = "<img border=0 src='" + top.y + "c.gif' height=170 width=1>";
				}
				else
				{
					top.frames.main.pokertable.style.visibility = "hidden";
					top.frames.main.s_ButtFunk.innerHTML = "";
				}
			}
			top.RunePayout = getdigit(o, 7);
			top.GuideRequests = getdigit(o, 8);
			top.ShowColors = getdigit(o, 9);
			upwin = 1;
		}
		else if(code == "44")
		{
			top.RJ = getdigit(o, 0);
			top.BJ = getdigit(o, 1);
			top.RQ = getdigit(o, 2);
			top.BQ = getdigit(o, 3);
			top.RK = getdigit(o, 4);
			top.BK = getdigit(o, 5);
			top.RA = getdigit(o, 6);
			top.BA = getdigit(o, 7);
			upbuttons();
		}
		else if(code == "49")
		{
			top.Inventory = o;
			upinventory(1, 0);
		}
		else if(code == "50")
		{
			top.frames.main.s_King.innerHTML = ms(o);
			top.King = ms(o);
		}
		else if(code == "51")
		{
			top.frames.main.s_ZoneBonus.innerHTML = ms(o) + (o == "None" ? "" : "%");
			top.ZoneBonus = ms(o);
		}
		else if(code == "52")
		{
			if(top.Players == null) top.Players = "-";
			top.Players = o;
			heh2 = top.frames.main.document.getElementById('general').action.value;
			if(top.LastAction != "poll" || (heh2 != "give" && heh2 != "givek" && heh2 != "trade")) upplayers();
		}
		else if(code == "53")
		{
			if(top.Players == null) top.Players = "-";
			players = o.split("-");
			for(j = 0; j < players.length - 1; j++)
			{
				if(top.Players == top.Players.replace("-" + players[j] + "-", "-")) top.Players += players[j] + "-";
			}
			heh2 = top.frames.main.document.getElementById('general').action.value;
			if(top.LastAction != "poll" || (heh2 != "give" && heh2 != "givek" && heh2 != "trade")) upplayers();
		}
		else if(code == "54")
		{
			if(top.Players == null) top.Players = "-";
			players = o.split("-");
			for(j = 0; j < players.length - 1; j++)
			{
				top.Players = top.Players.replace("-" + players[j] + "-", "-");
			}
			heh2 = top.frames.main.document.getElementById('general').action.value;
			if(top.LastAction != "poll" || (heh2 != "give" && heh2 != "givek" && heh2 != "trade")) upplayers();
		}
		else if(code == "55")
		{
			if(top.Creatures == null) top.Creatures = "-";
			top.Creatures = o;
			upcreatures();
		}
		else if(code == "56")
		{
			if(top.Creatures == null) top.Creatures = "-";
			creatures = o.split("-");
			for(j = 0; j < creatures.length - 1; j++)
			{
				if(top.Creatures == top.Creatures.replace("-" + creatures[j] + "-", "-")) top.Creatures += creatures[j] + "-";
			}
			upcreatures();
		}
		else if(code == "57")
		{
			if(top.Creatures == null) top.Creatures = "-";
			creatures = o.split("-");
			top.Creatures = "-" + top.Creatures;
			for(j = 0; j < creatures.length - 1; j++)
			{
				top.Creatures = top.Creatures.replace("-" + creatures[j] + "-", "-");
			}
			top.Creatures = top.Creatures.replace("-", "");
			upcreatures();
		}
		else if(code == "60")
		{
			top.frames.main.s_CannonN.innerHTML = mc(o);
			top.CannonN = o;
		}
		else if(code == "61")
		{
			top.frames.main.s_CannonS.innerHTML = mc(o);
			top.CannonS = o;
		}
		else if(code == "62")
		{
			top.frames.main.s_CannonE.innerHTML = mc(o);
			top.CannonE = o;
		}
		else if(code == "63")
		{
			top.frames.main.s_CannonW.innerHTML = mc(o);
			top.CannonW = o;
		}
		else if(code == "64")
		{
			top.frames.main.s_WallN.innerHTML = mc(o);
			top.WallN = o;
		}
		else if(code == "65")
		{
			top.frames.main.s_WallS.innerHTML = mc(o);
			top.WallS = o;
		}
		else if(code == "66")
		{
			top.frames.main.s_WallE.innerHTML = mc(o);
			top.WallE = o;
		}
		else if(code == "67")
		{
			top.frames.main.s_WallW.innerHTML = mc(o);
			top.WallW = o;
		}
		else if(code == "68")
		{
			top.frames.main.s_MoatN.innerHTML = mc(o);
			top.MoatN = o;
		}
		else if(code == "69")
		{
			top.frames.main.s_MoatS.innerHTML = mc(o);
			top.MoatS = o;
		}
		else if(code == "70")
		{
			top.frames.main.s_MoatE.innerHTML = mc(o);
			top.MoatE = o;
		}
		else if(code == "71")
		{
			top.frames.main.s_MoatW.innerHTML = mc(o);
			top.MoatW = o;
		}
		else if(code == "72")
		{
			top.frames.main.s_Catapults.innerHTML = mc(o);
			top.Catapults = o;
		}
		else if(code == "73")
		{
			top.frames.main.s_Soldiers.innerHTML = mc(o);
			top.Soldiers = o;
		}
		else if(code == "74")
		{
			top.frames.main.s_Archers.innerHTML = mc(o);
			top.Archers = o;
		}
		else if(code == "75")
		{
			top.frames.main.s_Trebuchets.innerHTML = mc(o);
			top.Trebuchets = o;
		}
		else if(code == "76")
		{
			top.Guard = o;
			if(top.Guard < 0) top.frames.main.s_Guard.innerHTML = "NONE";
			else if(top.Guard > 69) top.frames.main.s_Guard.innerHTML = top.clistS[top.Guard - 70];
			else top.frames.main.s_Guard.innerHTML = top.clistcur[top.Guard];
		}
		else if(code == "77")
		{
			top.frames.main.s_Moral.innerHTML = o / 100;
			top.Moral = o;
		}
		else if(code == "78")
		{
			top.frames.main.s_Tax.innerHTML = o;
			top.Tax = o;
		}
		else if(code == "79")
		{
			top.frames.main.s_Tres.innerHTML = mc(o);
			top.Tres = o;
		}
		else if(code == "80")
		{
			top.frames.main.s_Pop.innerHTML = mc(o);
			top.Pop = o;
		}
		else if(code == "81")
		{
			top.frames.main.s_Food.innerHTML = mc(o);
			top.Food = o;
		}
		else if(code == "82")
		{
			top.frames.main.s_Runes.innerHTML = mc(o);
			top.Runes = o;
		}
		else if(code == "90")
		{
			upchat(o, 0);
		}
		else if(code == "91")
		{
			top.Response = o;
			ly = [];
			ly[0] = "Unable to load list";
			ly[1] = "Too many characters.";
			ly[2] = "Assailment successful, but target kingdom was not overthrown.";
			ly[3] = "Assailment successful! You now own the target kingdom and have captured its treasury!";
			ly[4] = "Can't send an empty message.";
			ly[5] = "Don't use bad words. Because they are bad.";
			ly[6] = "Player not found or currently busy.";
			ly[7] = "Message Sent.";
			ly[8] = "You have not waited the necessary amount of time before doing another action.  Now you must wait an additional 10 seconds.";
			ly[9] = "You do not have the gear necessary to travel there.  <a href=../order/index.html target=_blank>Click here to purchase.</a>";
			ly[10] = "Besiegement successful, but target kingdom was not overthrown.";
			ly[11] = "Besiegement successful! You now own the target kingdom and have captured its treasury!";
			ly[12] = "Item Sold.";
			ly[13] = "You must be dead to revive.";
			ly[14] = "You don't have enough gold.";
			ly[15] = "Teleportation successful.";
			ly[16] = "You do not have the Intelligence necessary to teleport that far of a distance.";
			ly[17] = "";
			ly[18] = "Gold given.";
			ly[19] = "Chat Resize Successful.";
			ly[20] = "Kingdom settled.";
			ly[21] = "Someone already rules this kingdom. You must incite a coup to take it over.";
			ly[22] = "You must be the king to do that.";
			ly[23] = "Tax must be between 0 and 99 percent.";
			ly[24] = "Kings cannot do negative actions to their own kingdoms.";
			ly[25] = "You cannot attack your own kingdom!";
			ly[26] = "You can only attack or transport once per hour with each army unit type.  You must wait.";
			ly[27] = "You already have a better Guard in this zone.";
			ly[28] = "Neither you nor the kingdom have enough gold.";
			ly[29] = "Tax set.";
			ly[30] = "Guard hired.";
			ly[31] = "Kingdom does not have that much money to embezzle.";
			ly[32] = "Money embezzled.";
			ly[33] = "Food purchased.";
			ly[34] = "Morale is not low enough to attemp a coup.";
			ly[35] = "Coup successful!";
			ly[36] = "Coup failed.";
			ly[37] = "That is not enough to change Morale, save your pennies.";
			ly[38] = "Morale increased";
			ly[39] = "Morale decreased";
			ly[40] = "Army augmented";
			ly[41] = "Kingdom fortified";
			ly[42] = "You don't have that much of that unit to transport.";
			ly[43] = "You are not the king of the destination kingdom.";
			ly[44] = "Transport successful";
			ly[45] = "Item purchased, equip it to use.";
			ly[46] = "You have too many items in your inventory.";
			ly[47] = "You don't have that item.";
			ly[48] = "Item can not equip to that slot.";
			ly[49] = "Item equipped.";
			ly[50] = "Item already equipped elsewhere.";
			ly[51] = "Serious Equipment error, please report this.";
			ly[52] = "You must first revive...you are dead.";
			ly[53] = "Enemy not found. (Someone else in the zone might be fighting the same creature)";
			ly[54] = "You've been banned.";
			ly[55] = "You must be at a port to sail.";
			ly[56] = "Item given.";
			ly[57] = "Trade offered.";
			ly[58] = "Cannot trade pure relics. You can enchant an item with it first.";
			ly[59] = "Trade complete.";
			ly[60] = "Trade expired.";
			ly[61] = "Item Unequipped.";
			ly[62] = "Darkharvest grants you 10 ash for your cursed item. Type /ash to see your ash total.";
			ly[63] = "Relic display mode changed to verbose.";
			ly[64] = "Relic display mode changed to brief.";
			ly[65] = "Graphic window update mode changed to automatic.";
			ly[66] = "Graphic window update mode changed to manual.";
			ly[67] = "Attack successful, but target kingdom was not overthrown.";
			ly[68] = "Attack successful! You now own the target kingdom and have captured its treasury!";
			ly[69] = "You can only attempt to incite a coup once an hour.";
			ly[70] = "You get 1 gold and 1 ash for your cursed item. Type /ash to see your ash total.";
			ly[71] = "That will cause the player to go over 2 billion, give failed.";
			ly[72] = "You have been chastised and may not talk in emote for an hour. Misbehave repeatedly and you will be banned.";
			ly[73] = "You or your enemy has moved...lost target.";
			ly[74] = "Player muted/unmuted.";
			ly[75] = "You have been muted for an hour. Don't spam, beg, or auction in shout.";
			ly[76] = "Player killed.";
			ly[77] = "You must train first.";
			ly[78] = "Don't stretch the screen.";
			ly[79] = "Cannot sell this item.";
			ly[80] = "";
			ly[81] = "";
			ly[82] = "That item is bound to your soul and cannot be traded.";
			ly[83] = "To verify you are not macroing send <a href=javascript:pm('Glitchless')>Glitchless</a> a message immediately.";
			ly[84] = "Auctions enabled.";
			ly[85] = "Auctions disabled.";
			ly[86] = "Please enter numbers only.";
			ly[87] = "Money deposited";
			ly[88] = "";
			ly[89] = "";
			ly[90] = "Impossible.";
			ly[91] = "Item creation successful.";
			ly[92] = "Change Successful.";
			ly[93] = "Security Check Passed.";
			ly[94] = "Security check failed. If you repeatedly fail these checks your account will be banned. Failing an occasional security check is common and will not get you banned, however.";
			ly[95] = "You have too many of that item to create more.";
			ly[96] = "Item creation successful. This item is trivial for you to create.";
			ly[97] = "You have failed to create the item and lose your investment.";
			ly[98] = "You do not have enough runes.";
			ly[99] = "Password no longer correct.";
			ly[100] = "FAIL";
			if(parseInt(o, 10) >= 0 && parseInt(o, 10) <= 100)
			{
				top.frames.main.s_Response.innerHTML = ly[o];
				if(o == 6 || o == 8 || o == 9 || o == 10 || o == 11 || o == 12 || o == 18 || o == 46 || o == 51 || o == 56 || o == 57 || o == 59 || o == 60 || o == 62 || o == 67 || o == 68 || o == 70 || o == 74 || o == 75 || o == 78 || o == 83 || o == 84 || o == 85 || o == 91 || o == 92 || o == 93 || o == 94 || o == 96 || o == 97) domes(ly[o]);
				if(o == 8)
				{
					domes("If you receive multiple 10 second penalties and your delay bar is disabled you may wish to RE-ENABLE YOUR DELAY BAR BY TYPING /enable OTHERWISE THE 10 SECOND PENALTIES WILL CONTINUE!");
				}
				if(o == 13)
				{
					top.Health = 1;
				}
				if(o == 19)
				{
					upchat(79 + "<Chat Resized.|");
				}
				if(o == 45)
				{
					if(top.frames.main.document.getElementById('general').action.value == "buy" && top.frames.main.document.getElementById('general').target.options[top.frames.main.document.getElementById('general').target.selectedIndex].value == 10)
					{
						subbyz = top.frames.main.document.getElementById('general').other.selectedIndex;
						updatetarget("buy", 10, top.frames.main.document.getElementById('general'));
						top.frames.main.document.getElementById('general').other.selectedIndex = subbyz;
					}
				}
				if(o == 52)
				{
					top.Health = 0;
					upbars();
				}
				if(o == 54)
				{
					top.location.href = "../index.html";
					alert("You have been banned.");
					return;
				}
				if(o == 73)
				{
					top.TargetHealth = 0;
					top.Target = -1;
					if(!top.GraphicMode) upwindow(1);
					upbars();
				}
				if(o == 77)
				{
					top.Exp = 100;
					HPerc = 1;
					top.frames.main.s_Exp.innerHTML = "<table border=0 width=100% cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "ml.jpg'></td><td width=" + HPerc + "% background='" + top.y + "mfy.jpg' align=right></td><td width=" + (100 - HPerc) + "% background='" + top.y + "mee.jpg'></td><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "mr.jpg'></td></tr></table>";
				}
				if(o == 99)
				{
					top.location.href = "../index.html";
					alert("Password no longer correct.");
					return;
				}
			}
			top.frames.main.s_Response.innerHTML = "<font size=4>" + top.frames.main.s_Response.innerHTML + "</font>";
		}
		else if(code == "92")
		{
			processfight(o, 0);
		}
		else if(code == "93")
		{
			subo = o.split("|");
			xyi = 0;
			while(xyi < subo.length - 1)
			{
				bluball = top.frames.main.s_Response.innerHTML.toString();
				if(bluball.length > 2500)
				{
					if(top.NoFights == 0)
					{
						top.NoFights = 1;
						top.frames.main.s_Response.innerHTML = top.frames.main.s_Response.innerHTML + "<br>Too many fight messages to display.";
					}
					break;
				}
				else
				{
					top.NoFights = 0;
					processfight(subo[xyi], 1);
					xyi++;
				}
			}
		}
		else if(code == "94")
		{
			subo = o.split("!");
			xyi = 0;
			while(xyi < subo.length)
			{
				ivar = parseInt(subo[xyi], 10);
				if(xyi == 0) top.PokerTimer = ivar;
				else if(xyi == 1)
				{
					top.pAsh = ivar;
					top.frames.main.PokerAsh.innerHTML = ivar;
				}
				else if(xyi == 2)
				{
					top.pBet = ivar;
					top.frames.main.PokerBet.innerHTML = (ivar * 10);
				}
				else if(xyi == 3)
				{
					top.pToCall = ivar;
					top.frames.main.PokerToCall.innerHTML = (ivar * 10);
				}
				else if(xyi == 4)
				{
					top.pPot = ivar;
					top.frames.main.PokerPot.innerHTML = ivar;
				}
				else if(xyi == 5)
				{
					top.pCards1 = ivar;
					if(ivar != 0)
					{
						top.frames.main.PokerCard1.src = "" + top.y + "c.gif";
						top.frames.main.PokerCard1.src = "" + top.y + "card" + ivar + ".gif";
						top.frames.main.PokerCard1.className = "vis1";
					}
				}
				else if(xyi == 6)
				{
					if(ivar != 0)
					{
						top.pCards2 = ivar;
						top.frames.main.PokerCard2.src = "" + top.y + "c.gif";
						top.frames.main.PokerCard2.src = "" + top.y + "card" + ivar + ".gif";
						top.frames.main.PokerCard2.className = "vis1";
					}
				}
				else if(xyi == 7)
				{
					top.pCards3 = ivar;
					top.frames.main.PokerCard3.src = "" + top.y + "c.gif";
					top.frames.main.PokerCard3.src = "" + top.y + "card" + ivar + ".gif";
					top.frames.main.PokerCard3.className = "vis1";
				}
				else if(xyi == 8)
				{
					top.pCards4 = ivar;
					top.frames.main.PokerCard4.src = "" + top.y + "c.gif";
					top.frames.main.PokerCard4.src = "" + top.y + "card" + ivar + ".gif";
					top.frames.main.PokerCard4.className = "vis1";
				}
				else if(xyi == 9)
				{
					top.pCards5 = ivar;
					top.frames.main.PokerCard5.src = "" + top.y + "c.gif";
					top.frames.main.PokerCard5.src = "" + top.y + "card" + ivar + ".gif";
					top.frames.main.PokerCard5.className = "vis1";
				}
				else if(xyi == 10)
				{
					top.pCards6 = ivar;
					top.frames.main.PokerCard6.src = "" + top.y + "c.gif";
					top.frames.main.PokerCard6.src = "" + top.y + "card" + ivar + ".gif";
					top.frames.main.PokerCard6.className = "vis1";
				}
				else if(xyi == 11)
				{
					top.pCards7 = ivar;
					top.frames.main.PokerCard7.src = "" + top.y + "c.gif";
					top.frames.main.PokerCard7.src = "" + top.y + "card" + ivar + ".gif";
					top.frames.main.PokerCard7.className = "vis1";
				}
				xyi++;
			}
		}
		else if(code == "29")
		{
			top.TargetHealth = o;
			if(o == 0 && top.Target != -1)
			{
				upfight(33 + "<" + "<a href=javascript:tg('" + mp(top.Target) + "')>" + getcreature(top.Target) + "</a>" + " slain by another player.|");
				top.Target = -1;
				if(!top.GraphicMode) upwindow(1);
			}
			upbars();
		}
		else if(code == "99")
		{
			secvar = "";
			secvar += "<img border=0 height=200 width=200 src=../sec/" + o + ".bmp><br>How many do you see? Repeated incorrect answers can result in banning.<br><a href=javascript:security(1)><font size=5><b>One</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(2)><font size=5><b>Two</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(3)><font size=5><b>Three</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(4)><font size=5><b>Four</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(5)><font size=5><b>Five</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(6)><font size=5><b>Six</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(7)><font size=5><b>Seven</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(8)><font size=5><b>Eight</b></font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=javascript:security(9)><font size=5><b>Nine</b></font> </a>";
			top.frames.main.s_Response.innerHTML = secvar;
		}
	}
	if(top.frames.main.document.getElementById('general').action.value == "sail")
	{
		updatetarget("sail", top.frames.main.document.getElementById('general').target.options[top.frames.main.document.getElementById('general').target.selectedIndex].value, top.frames.main.document.getElementById('general'));
	}
	if((upwin != -1 && top.GraphicMode == 0) || (upwin == top.WindowMode)) upwindow(upwin);
	if(top.UpdateLevel)
	{
		fLevel = parseFloat((parseFloat(top.Str, 10) + parseFloat(top.Dex, 10) + parseFloat(top.Agi, 10) + parseFloat(top.Dur, 10) + parseFloat(top.Ntl, 10) + parseFloat(top.Cnc, 10) + parseFloat(top.Cnt, 10)) / 140, 10);
		Levelrem = fLevel / 100;
		top.Level = parseInt(fLevel / 100, 10);
		Levelrem -= top.Level;
		HPerc = parseInt(Levelrem * 100, 10) % 100;
		top.frames.main.s_login.innerHTML = mc(top.Level);
		top.frames.main.s_Level.innerHTML = "<table border=0 width=100% cellspacing=0 cellpadding=0><tr><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "ml.jpg'></td><td width=" + HPerc + "% background='" + top.y + "mfa.jpg' align=right></td><td width=" + (100 - HPerc) + "% background='" + top.y + "mee.jpg'></td><td width=0 bgcolor=0><img border=0 height=15 width=11 src='" + top.y + "mr.jpg'></td></tr></table>";
		top.UpdateLevel = 0;
	}
	upbuttons();
	if(!didit)
	{
		top.ActionDelay=1;
		if(top.ActionDelay <=0)top.ActionDelay=1;
		top.ActionInc=1
		setTimeout("top.frames.main.updelay()","50");
	}
}
function setCookie(name, value, expires, path, domain, secure) {
var curCookie = name + "=" + escape(value) +
((expires) ? "; expires=" + expires.toGMTString() : "") +
((path) ? "; path=" + path : "") +
((domain) ? "; domain=" + domain : "") +
((secure) ? "; secure" : "");
document.cookie = curCookie;
}
function getCookie(name) {
var dc = document.cookie;
var prefix = name + "=";
var begin = dc.indexOf("; " + prefix);
if (begin == -1) {
begin = dc.indexOf(prefix);
if (begin != 0) return null;
} else
begin += 2;
var end = document.cookie.indexOf(";", begin);
if (end == -1)
end = dc.length;
return ms(unescape(dc.substring(begin + prefix.length, end)));
}
function fixDate(date) {
var base = new Date(0);
var skew = base.getTime();
if (skew > 0)
date.setTime(date.getTime() - skew);
}
function st()
{
top.y = getCookie("imagey");
if(top.y == null)
{
top.y = "../";
}
if(top.login==null)
{
top.location.href="../index.html";
alert("Game interface updated.  You must now log-in again.");
}
top.timing = getCookie("timing");
if(top.timing == null)
{
top.timing = Math.random()*2000000000;
top.timing = top.timing.toString();
var now = new Date();
fixDate(now);
now.setTime(now.getTime() + 30000000000);
setCookie("timing",top.timing,now,"/");
}
top.timings = top.timings+top.timing;
top.LastPoll=0;
top.PokerRound=0;
top.ShowText=0;
top.PokerLive=0;
top.PokerLeft=2;
top.PokerTop=0;
top.PokerTimer=0;
top.RunePayout=0;
top.GuideRequests=0;
top.pAsh=0;
top.pBet=0;
top.pToCall=0;
top.pPot=0;
top.pCards1=0;
top.pCards2=0;
top.pCards3=0;
top.pCards4=0;
top.pCards5=0;
top.pCards6=0;
top.pCards7=0;
top.DisBar=0;
top.NoBattle=0;
top.RA=top.BA=top.RK=top.BK=top.RQ=top.BQ=top.RJ=top.BJ=0;
top.ignorelist = ["","","","","","","","","","","","","","","","","","","",""];
top.clistd=["Bones Brawler","Magma Millipede","Soulless Horror","Abandoned Body","Light Thief","Unending Depth Crawler","Subterranean Mummy","Venemous Corpse","Dark Matter","Lava Scale Snake","Ruler of the Dead","Infested Scorpian","Wicked Warlock","Demonifier","Dampness Drawer","Regurgitated Tongue","Swollen Slave","Corrupted Cretin","Mindless Body","Unidle Hand","Death Caller","Abysmal King","Highland Sword Slayer","Formless Golem","Chained Remains","Blood Seeker","Antimatter Mammal","Reverberated Screams","Undead Gatekeeper","Cemetery Queen","Dissolved Spirit","Dragon of the Underworld","Heartless Ancient","Ashkeeper","Time Corruptor","Wreckless Wreaker","Drain Scaler","Nightmare Manifestor","Meditator of Mischief","Veinful Eye","Bone Layer","Dream Haunter","Red Rebuker","Slayer of the Unforgiven","Night Stepper","Gargoyle Tamer","Sun Spoiler","Rememberence Breaker","Angel Scalper","Flames of Rebellion","Helpless Harmer","Rager of Wrath","Vampire Veerer","Death Solicitor","Repentless Barbarian","Cretin Commander","Demon of Dim","Intestinal Slither","Pretentious Prisoner","Oppoparasite","Wreaker of Relevance","Darkness Dementor","Fear Stenchor","Telilaquoy Keeper","Uoeslay King","Turmoil Trencher","Soul Cave Creator","Behemoth of Belsebub","Dragon of Belsebub","Satan"];
top.cliste=["Clouds Caretaker","Sky Scuffler","Nightless Nymph","Harp Harpy","Lithosphere Sentry","Admitmite","Rain Maker","Dream Catcher","Elite Endomorphism","Sun Gazer","Careless Cupid","Darkness Destroyer","Lightwave Escort","Dragon of Dreams","Angellic Archer","Free Radical","Gravity Defier","Light Leopard","Borealis Queen","Lineless Tiger","Cloud Regenator","Prosperous Popper","Creature of Legality","Aspirator","Bouyancy Bouncer","Abid Aglow","Heavenly Paladin","Sentinal of Serenity","Ballad Behaver","Glow Golem","Fateful Forgiver","Darmalitor","Austerer","Astral Animal","Ruler of Elevation","Monotheist","Creationist Cretin","Caratharom","Sky Skeeve","Monastic Monk","Bold Besetter","Remcha’s Assistant","Forgiver of Sins","Covetlessor","Avenger of All","Neferian","Unslayer","Holy Tideskeeper","Griffin of Greatness","Winged Equestrian","Commander of Corriolis","Priest of the Shining","Helliminator","Blue Bioler","Bremont Behemoth","Whitewasher","Sirens of Life","Delly Dainsman","Illustrious Lawmaker","Gleaming Ghoul","Life Waker","Guardian Angel","Ascendationer","Glistening Gleekeeper","Knower of Nothing","Lightfoot Lion","Feline Floater","Behemoth of The One","Dragon of The One","Almighty Avatar"];
top.hotlist=["R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R"];
top.clista=["Magician`s Apprentice","Goblin Soldier","Bone Knight","Floating Specter","Goblin Commander","Sand Dragon","Evil Magician","Fearless Barbarian","Warlock","Ice Dragon","Blade Master","Armored Giant","Battle Mage","Cloaked Vampire","Goblin Ruler","Fire Knight","Demon Warrior","Sorcerer of Lightning","Chameleon Archer","Rock Giant","Warlord of Legend","Demon King","Highland Sword Master","Stone Golem","Master of the Beasts","Lava Dragon","Elvin Marksman","Shrouded Mage","Master of the Undead","Dark Knight","Elemental Wizard","Crystal Dragon","Blackened Behemoth","Elder Scarred Warrior","Ogreathamol","Flow Animated Golem","Elder Dragonkin","Angel of Unending Darkness","Soul Thief Magician","Ancient Retributor","Stilva Slider","Grunt Workhorse","Twin Raider","Peddled Parasite","Kumara King","Fortress Sculptor","Wolfkin Howler","Grayest Gremlin","Redroot Treant","Sheaf Scaleman","Mayhem Maestro","Slalom Serpent","Stifled Arguer","Larrikin Leech","Lese Lizardwalker","Peseta Princess","Sephiroth Reborn","Jailer`s Kinsman","Scaleless Dragon","Agleam Avenger","Archnem Gargoyle","Sisal`s Elderkin","Blood Thief","Spoils Keeper","Yeti Marimon Swordsman","Mind Scandalmonger","Joisted Harpyking","Scalpels Scorner","Anglia Amor Resenter","Yoro La HiHi Samurai"];
top.clistcur=top.clista;
top.clistb=["Skeleton Warrior","Underground Skirmisher","Lightless Ghost","Sand Rebu King","Darkness Leech","Relentless Knight","Subterranean Corpse","Walking Dead","Beast of the Night","Dark Shade Behemoth","Dungeon Master","Plague Rat","Undead Skellie","Severed Limb","Evisceralor","Basement Soul","Depth`s Demon","Cauldron Carrier","Black Legend","Soulless Corpse","Shrie King","Abysmal Queen","Lowland Sword Master","Golem of the Night","Master of the Slaves","Magma Warrior","Earth Core Collector","Enliminal Slug","Decaying Bone Golem","Senior Grave Guard","Unforgiven Soul","Damned Dragon","Charred Guardian","Dragonalism Knight","Patient Death Bringer","Reanimated Specter","Carrier of Misfortune","Keeper of the Damned","Hellspawn Angel","Right Hand of Satan","Eloign Excavator","Gargoyle of the Night","Airily Angel Slayer","Kisser of Lifelessness","Commander of Shadows","Groar Gremlin","Defilator","Dignek of the Dark","Skeeskee Charmer","Unnobleman","Groaning Tormentor","Heinous Harpy","Scrutin Eye","Loiter`s Keeper","Waif Wanderer","Farg Farg","Liberalless Princess","Scrofula Demon","Dragon of Torment","Bailiff of Hell","Gaia Harpy","Fissile Fearman Guard","Portentous Stratumism","Technor Beast","Uoeslay Queen","Latent Sufferism","Drifting Bottomscaler","Belial`s Keepsman","Nosferatu","Owner of Infinite Darkness"];
top.clistc=["Winged Warrior","Sky Skirmisher","Nymph Flyer","Lowly Gatekeeper","Cloud Carrier","Stratospherian","Star Thief","Paradise Prowler","Resplendence Swordsman","Sheen Queen","Reful Gent","Angel Aglow","Damner of Darkness","Chiaroscuron","Bower of Bliss","Lambent Levitator","Demon Slayer","Gilead Goth","Legend of Light","Slave of the Aurora","Reliance","Renitence Rogue","Radiant Bowman","Golem of Scintillation","Luminary Nemesis","Warrior of the Ways","Beatific Behemoth","Unearthly Guardian","Supernal Snake","Celestial Being","Soul Savior","Dragon of Deification","Apotheosis Assassin","Hesperides Carnivore","Olympus Knight","Lightbringer of Crom","Arcadia Archer","Elysium Guard","Angel of Nirvana","Eden`s Keeper","Gold Griffin","Slainless Urchin","Nervosa of Angelhair","Modal Menosaur","Cobias Cobraman","Enzootic Endoplasm","Yoga Nemesis","Shimmering Quakekeeper","Votary Elevation Mistress","Tided Chieftain","Nibel King","Ewers Light Protector","Skyman Archer","Scoffer of the Sky","Defacer","Festal Firesoul","Reticulated Resonator","Alfas of the Shining","Frailful Angel Daughter","Fief Eternal Torchbearer","Mastic Fabler","Effaceton Angel","Keepscape Guard","Corona Child","Aerates Angerchild","Appareled Nemesis of Night","Cloud Scrapper","Guardian of Heights","Master of Elevation","Templar of Light"];
top.clistf=["Magma Mite","Rock Vyper","Rotwood Treant","Terribad Breatheman","Dwarven Cuckold","Molten Swimmer","Metaleg Spider","Hardened Pattycake","Limpdeck Snail","Beast of Burden","Teary Captive","Pyrite Pirate","Chain Eater","Crib Keeper","Sandstone Prince","Sulfur Mummy","Conveyer Guard","Dwarven Nanny","Rock Crusher","Le Gem Thief","Float Dust Tiller","Metal Braider","Dust Sucker","Ore Extractor","Dwarven Geologist","Stone Demon","Pimpled Pusslick","Tube Crawler","Lava Bather","Sparkleshell","Salt Seller","Glassifier","Tracksmith","Grinder Angel","Core Driller","Hairless Dwarf","Caltrop Collector","Basalt Behemoth","Quartz King","Stitchy","Kerf Queen","Roof Jacker","Bellows Bellower","Undead Canary","Sump Pumper","Scorched Serpent","Tunneler","Amethystian","Malacretin","Forge Mech","Hematitan","Acidspray Scorpion","Metal Smith","Chiselhead","Diamondbeak","Magma Drinker","Knight of Obsidian","Agate Keeper","Waylayer","Crystal Golem","Mazemind","Detonator","Gold Gobby","Cave Drake","Carbide Assassin","Ancient Wyvern","Guardian of Granite","Wurm of the Deep","One Eye Minotaur","Vampyre Dragon"];
top.clistS=["POLYMORPHIC BEETLE","CRUCIFIED CORPSE","DARKEST WIDOW","ECLYPTIC HELL ANGEL","ROGUE GOBLIN","UNBORN TORMENT","UNBORN TORMENT","UNBORN TORMENT","LORD ALCHEMAR","LORD ALCHEMAR","LORD ALCHEMAR","LORD ALCHEMAR","ANCIENT ALCHEMAR","MASTER TEMPLAR","GRANDMASTER TEMPLAR","GOBLIN SHAMAN","GOLEM OF LIVING ROCK","FIRE DRAGON EATER","THUNDER DRAGON EATER","ICE DRAGON EATER","GOBLIN THIEF","GOBLIN MINER","GOBLIN KING","DRAGONLING ZOMBIE","NIGHTMARE FLY"];
top.weapons=["Rusty Dagger","Old Knife","Broken Short Sword","Tarnished Scythe","Iron Mallet","Long Spear","Dull Katana","Strong Staff","Polished Tusk","Bronze Sharpened Dagger","Iron Claw","Naginata","Gold Plated Mallet","Etched Scythe","Poison Spear","Silver Tip Axe","Two Handed Battle Axe","Shimmering Long Sword","Ancient Katana","Blackened Pole","Crystal Staff","Engraved Dragon Bone","Bane Claw","Imploded Wand","Ovaline Double Sword","Molten Axe","Adversary Avenger Blade","Titan`s Mallet","Angel Fang Katana","Diamond Scorn Maret","Ancient Eye Wand","Head Heavy Staff","Scythe of Deliverance","Angled Razor Sword of Reznor","Undercurved Flesh Dispatcher","Cane of Tumultuous Torment","Axe of the Caged Angel","Demon Bone Mace","Katana of Ninth Life","Sword of Righteous Revenge","Mysterious Blade","Sword Of Omens","Dirk of Dark Magic","Rustic Light Shard","Eviscerating Eagle Claw","Dragon Tail Chain","Unforgiving Edge","Blackened Dragon Fang","Repressed Samurai Sword","Elimbinator","Crackling Tendril","Hammer of Execution","Bloodblack Recurve","Blackened Reaver","Flamberge of Flames","Bone Bladed Scythe","Unforgiving Flail","Brute Chopper","Enchanted Battle Staff","Rediron Pike","Reaping Rapier","Poison Barbed Whip","Bloodforge Axe","Cold Iron Claymore","Dwarven Double Edge","Bone Serrator","Combine Long Sword","Whip of Severance","Beheaden Blade","Rustless Lifeceaser","Mace of Resurrection","Double Axe of Durability","Bloodraker","Tension Torqer","Sword of Heavenly Ascension","Pandemonium`s Vociferation","Awe Bringer","Avengment of the Fallen","Angel`s Eye Piercer","Claw of Demon Praise","Sword of Molten Death","Crystal Dragon Fire Axe","Blade of Fleeting Stealth"];
top.multi=["Dirty Rag","Cloth","Woven","Lined Mail","Bamboo Plate","Hardened Bark","Tin Platemail","Rusty Ringmail","Darkskin","Copper Scalemail","Bloody Iron Plate","Silvery Jointed Plate","Shiny Ringmail","Blackened Scalemail","Spiked Guard","Etched Adamantine","Gold Tipped Lined Mail","Heavy Cast Iron","Buffed Crystalline","Ageless Alchemist Ringmail","Spider Silk Woven","Shiny Platemail","Blackened Mennonite","Undead Skinned","Regenerating Troll Skin","Fire Dragon Scale","Molten Ringmail","Ice Dragon Scale","Magma Pounded Platemail","Angel Wing","Avenger Shieldskin","Aged Crystal","Fire Enderamoth","Indefinite Protection","Cry Ender","Cyclop`s Eye","Unholy Intervention","Demon`s Horn","Elemental Deceit","Ultimate Indifference","Enamalace Endoskeleton","Torment Skin","Refolded Diamond Plate","Damage Disregarder","Impenetrable Lamentation","Fortrousness Steelmail","Ancient Fortitude","Dragon Wing","Density Stone Guard","Unbreaking Body","Ice Forged","Melted Crystal","Woven Angel Hair","Tusk Spiked","Mortared Magma","Ageless Alkaline","Thousand Spun Silk","Smelted Carbonite","Widow Web","Acidified Stone","Lipased Enzyme","Regretless Mesh","Life Vigor","Perpetual Ice","Virgin Diamond","Creedless Cyrosilk","Treant Regrowth","Petrified Ancientscale","Behemoth Skin","Timeless Fortitude","Perforation Crafted","Imbued Perfection","Reivived Organismal","Clarified Creation","Enlightened Everbearing","Divine Transcension","Staggering Unsurpassment","Demon`s Adulation","Protectant Prevailation","Devouring Lifeless Demise","Tecton Scaled Platemail","Crystal Dragon Skin","Shadow Scale of Invisibility"];
top.hurts=["Acid Drop","Flame Blast","Striking Shadows","Soulwrack","Elemental Invocation","Unholy Provocation","Frost Whip","Flesh Rot","Dark Lash","Fire Burst","Bleeding Pores","Vile Curse","Crystal Shards","Chilling Scythe","Meteor Swarm","Lightening Arc","Flaming Spears","Aether Inferno","Agonizing Torment","Bolt of Death","Reaving Relent","Brain Decay","Mystic Mirage","Howl From Below","Incineration","Regenerating Talons","Chaos Hammer","Banshee Wail","Lightning`s Lament","Bath of Razors","Feast of the Demons","Earthen Maw","Arcane Vengeance","Arctic Chill","Hell Fury","Spirit Annihilation","Frost Gate","Mind Shatter","Shriek of the Damned","Oblivion Orb","Obsidian Undershimmer","Unrelentious Retribution","Lost Soul`s Suffering","Relentless Clouds","Scream of the Unending","Retribution of the Wronged","Brain Boilation","Holocaustic Nuke","Shattering Blood Rebellion","Unholy Derangement","Nuke of Nosferatu","Belial`s Calling","Nerve Collapse","Inner Incineration","Eyesplode","Spirit Invocation","Hades Glimpse","Comfortless Pillow","Angelic Anguish","Demon Summonation","Silent Serenity","Lucifer`s Lament","Naysay","Manifest Corpse","Heretic Howl","Death Shroud","Morbid Provocation","Blood Curdle","Shriek of Satan","Lifeless Growls","Sinner`s Rebirth","Body Singe Durability","Spirit Bind","Eternal Yearning","Vivacity Arbitration","Boiling Contempt","Demon`s Despisal","Disparagement of the Forgotten","Hellacious Rebirth","Horrendous Defilation","Devouring Bloodflow","Crystalizing Consciousness","Ethereality"];
top.heals=["Minor Sanation","Regain Breath","Endow Health","Summon Breath","Aether Heal","Unrupture","Well of Life","White Light","Minor Rejuvenation","Elemental Breath","Regainment","Minor Recovery","Sanation","Regain Energy","Pain Forgettence","Summon Life","Aether Resurrection","White Life","Elemental Recovery","Rejuvenation","Summon Angels","Major Sanation","Regain Resistance","Endow Life","Undo Harm","Strength Remembrance","Unbegotten","Ceased Suffering","Major Rejuvenation","Reap Repair","Healer`s Omen","Omega Sanation","Asuwere","Regain Life","Effervescence","Replenish","Total Recall","Unending Regeneration","Rebirth","Breath of Life","Retainer`s Revelation","Life Empowerment","Angelic Anomaly","Forgetful Rendation","Disallowed Torment","Blinding Whiteness","Revelation of Health","Arrogant Regainment","Unholy Recollection","Eternal Enhancement","Wings of Support","Unbreaking Bones","Angelic Wind","Adoption","Begone Affliction","Devil of Light`s Curse","Eye Glisten","Rebel Rehab","Rekindled Flame","Endall Suffering","Blinkback","Sorrowless","Pain`s Demise","Former State","Forced Blood Flow","Staggerless Agane","Blessing from Below","Restoration","Ardent Alignment","Livagane","Healthinator","Goshimhappy","Healmesoftly","Pheelgud","Lifeomatic","Gadam!","Sumholishit","Omagawad","Heavenly Recirculation","Everlasting Aura","Earthen Revivication","Crystaliner","The Unseen Hand of an Angel"];
top.relics=["Strong Arm","Archer`s Eye","Cat`s Feet","Merlin`s Insight","Mental Focus","Impediment","Priest`s Touch","The Calling of Titus","Debilitator","Maladroit","Dawdle","Stupidify","Distraction","Mind Pierce","Touch of the Damned","The Calling of Cassius","Siphon Strength","Stolen Hands","Filched Feet","Pilfered Intellect","Lifted Thoughts","Purloinment","Blood Pinch","The Calling of Lestat","Confusion","Life Roulette","Annulment","Damage Shield","Damage Capacitor","The Calling of Cara","Dexterous Hoist","Stream of Conscious","Blood Bath","Vampiric Leech","Death Spike","Denial of the Believer","Melee`s Rage","Caster`s Revenge","Vampire`s Scorn","Devil`s Deliverance","Unerring Edge","Faithful Severity","Clarity","Mental Virtue","Devestation","Rectification","Allegiance","Impetuosity","Preservation","Monasticism","Theurgal Equalizer","Theurgal Conquest","Tears of the Fallen","Leather of Delegation","Apex","Sacrificial Skillation","Encephalon Decay","Vogar`s Vice","Shirt Ripper","Brain Swell","Voidance","","","Putrefaction","Free Fortifier","","Melee`s Undying Rage","Caster`s Eternal Revenge","Vampire`s Amaranthine Scorn","Devil`s Deleterious Deliverance","","Devil`s Mutilating Deliverance","Devil`s Lithe Deliverance","Devil`s Putrid Deliverance","Devil`s Resistant Deliverance","Devil`s Skillful Deliverance","Devil`s Accelerated Deliverance","Devil`s Warring Deliverance","Devil`s Opulent Deliverance","Devoidance","","Devil`s Mutilating Devoidance","Devil`s Lithe Devoidance","Devil`s Putrid Devoidance","Devil`s Resistant Devoidance","Devil`s Skillful Devoidance","Devil`s Accelerated Devoidance","Devil`s Warring Devoidance","Devil`s Opulent Devoidance"];
top.specials=["Platinum Ore","Mountain Tamer","Fyre Rock","Lava Splicer","Ocean Bubble","Aqua Lungs","","Transcendental Sanction","Demon Horn","Lava Boots","Demonic Pinions","","Angel Hair","White Wings","Sailor`s Crimp","Totem of Second Chances","Carbon Encasement","Wand of Transportation","Satan`s Calling","Haste of Hell","Fish Scales","Wand of Swift Winds","Temple Stone","Experience Egg","Experience Gravitator","Omega Sanction","Crystal of Lars","Templar`s Wand","Enduring Fists","Fists of Scale","Fists of Flames","Coif of Confidence","Sharpening Stone","Skill Binder","Cloak of Concentration","Fisherman`s Catch","Andal Man`s Finger","Devell Man`s Toe","Embossed Coin of Le Deep","Sack of Potatoes","RDADMS Lessonbook","Satan`s Hide","Backpack","Vampskin","Vamp Hide","Vamp Horns","Coif of the Calling","Coif of Refulgence","Cloak of Conceit","Cloak of Debilitation","Sanction of Surpassment","Dwarven Weaponcraft Guide","Balace Armorcraft Guide","Sylvain Fletcher`s Workbook","Solon`s Arcane Booklet","Mesmer`s Book of Mythics","Warrior`s Companion","Tradeskill Manifesto","Theurgal Rune Staff","Theurgal Focus Staff","Theurgal Damnation Staff","Detangler","Lord Alchemar`s Skull","Quickening","Scepter of Annulment","Enhanced Nock","Bounteous Nock","Archer`s Pouch of Secrecy","Mask of Enshroudment","Scroll of Forbidden Rights","Scepter of Harnessed Hatred","Scepter of Unending Repulsion","Harbinger`s Scepter of Oppression","Skill Potencifier","Warrior`s Warder","Caster`s Minion","Scepter of Delegation","Warrior`s Squire","Caster`s Familiar","Archer`s Aide","Theurg Orb","Goblin Hide","Goblin Hide Backpack","Goblin Head","Fangs of the Bloodletter","Beast Bane","Beast Noobane","Sanction of Serenity","Attacker`s Balance","Captain`s Staff of Valor","Afelikian Coin","Retrokian Amulet","Ice Dragon Scales","Potion of Dillusia","Head of a Dillusian","Scepter of Specter Sight","Scepter of Master Craftsmanship","Sash of the Blood Rogue","White Ashen Rock","Grey Ashen Rock","Black Ashen Rock","10 Days Templar and Access","Deformed Wing","Goldblum Goo"];
top.elements=["Fire","Lightning","Ice","Lava","Storm","Blood","Lava","Storm","Blood","Enchantment","Dark Mutilation","Dark Litheness","Dark Putridity","Dark Resistance","Dark Skill","Dark Acceleration","Dark War","Dark Opulence","Treasure","Great Treasure","Tecton","Stone","Dragon Flames","Dragon Storm","Dragon Shards","50k Ash","50k No Trade Ash","Ruby","Sapphire","Emerald","Superior Treasure","Great Rubies","Great Sapphires","Great Emeralds"];
top.PortN=["Perydan","Andal","Roggork","Treval","Carella","Drevina","Afelik","Drehador","Berena","Redock","Baneesh","Kremk","Honar","Slevisk","Rayvosk","Hykra","Devell","Merlana","Gretia","Tuval","Retrok","Angilek","Wefaria","Demainia","Satinia","Belania","Crovesk","Kravot","Disseria","Dillusia"];
top.PortX=["150","130","050","097","129","155","245","267","277","223","128","047","056","178","209","017","017","024","025","117","173","193","210","247","290","261","247","267","268","274"];
top.PortY=["197","164","049","021","051","043","124","226","277","268","234","290","208","244","281","271","174","061","031","014","019","009","010","104","075","020","184","208","244","158"];
top.tradez=["Weapon","Armor","Bow","Spell","Relic","Chant"];
top.subz=["Metal","Leather","Wood","Glass","Gem","Rune"];
top.titlez=["Student","Pupil","Beginner","Recruit","Neophyte","Debutant","Taskmate","Helper","Apprentice","Assistant","Novice","Jobber","Scholar","Pundit","Savant","Master","Grandmaster"];
top.skillz=["Attacking Accuracy","Attacking Precision","Casting Accuracy","Casting Precision","Criticality","Regeneration","Kingmanship","Haste","Defensive","Monk Discipline","Ruby Hoarding","Sapphire Hoarding","Emerald Hoarding"];
top.document.title = top.login;
top.hio=hio=" onload=\"this.style.filter='progid:DXImageTransform.Microsoft.Glow(Color=white,Strength=1)';this.style.filter='progid:DXImageTransform.Microsoft.Glow(Enabled=0)'\" onmouseout=\"this.style.filter='progid:DXImageTransform.Microsoft.Glow(Enabled=0)'\" onmouseover=\"this.style.filter='progid:DXImageTransform.Microsoft.Glow(Color=white,Strength=1)'\" ";
hix=" onmouseout=\"this.style.filter='Z-INDEX:3;progid:DXImageTransform.Microsoft.Glow(Enabled=0)';this.width=23;this.height=30;\" onmouseover=\"this.style.filter='Z-INDEX:5;progid:DXImageTransform.Microsoft.Glow(Color=black,Strength=1)';this.width=46;this.height=60;\" ";
hi1="<td width=20% bgcolor=#000000>&nbsp;<a target=_blank href=../info.htm#";
hi2="<td width=25% bgcolor=0>&nbsp;<a target=_blank href=../info.htm#";
document.write("<html>\
<head>\
<style type=\"text/css\">#divContainer {visibility: 1; overflow: hidden; width:144; height: 144;}#divContent {width: 400; height: 400; position: absolute;}</style>\
<STYLE TYPE=text/css>A:link, A:visited, A:active { text-decoration: none }</STYLE>\
<style fprolloverstyle>A:hover {color: #C89468; text-decoration: underline}</style>\
<STYLE> body {scrollbar-arrow-color: #ABB5BF;scrollbar-base-color: #000000;scrollbar-face-color: #000000;}</STYLE>\
</head>\
<body onload=chat.target.focus() background='"+top.y+"wood.jpg' bgcolor=#000000 topmargin=0 leftmargin=0 marginheight=0 marginwidth=0 text=#FFFFFF link=#C89468 vlink=#C89468 alink=#C89468>\
<table cellspacing=8 border=0 cellpadding=0 width=100%>\
<tr><td width=100%><table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center colspan=4><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
<tr>\
<td background='"+top.y+"side.jpg' rowspan=3><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
<td width=25% bgcolor=0>&nbsp;<span id=s_name></span>&nbsp;<a target=_blank href=../info.htm#lev>Lev</a>: <span id=s_login></span></td>\
"+hi2+"loc>Loc</a>: <span id=s_Loc></span></td>\
"+hi2+"gold>Gold</a>: <span id=s_Gold></span></td>\
<td width=25% bgcolor=0><span id=s_Exp></span></td>\
<td background='"+top.y+"side.jpg' rowspan=3><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
</tr>\
<tr>\
"+hi2+"str>Str</a>: <span id=s_Str></span></td>\
"+hi2+"dex>Dex</a>: <span id=s_Dex></span></td>\
"+hi2+"agi>Agi</a>: <span id=s_Agi></span></td>\
<td width=25% bgcolor=0><span id=s_Level></span></td>\
</tr>\
<tr>\
"+hi2+"dur>Dur</a>: <span id=s_Dur></span></td>\
"+hi2+"ntl>Ntl</a>: <span id=s_Ntl></span></td>\
"+hi2+"cnc>Cnc</a>: <span id=s_Cnc></span></td>\
"+hi2+"cnt>Cnt</a>: <span id=s_Cnt></span></td>\
</tr>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center colspan=4><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
</table></td>\
<td width=0 rowspan=2><span id=s_Window></span>\
</td>\
</tr>\
<tr><td width=100%><table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center colspan=5><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
<tr>\
<td background='"+top.y+"side.jpg' rowspan=6><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
<td width=20% bgcolor=0 colspan=1>&nbsp;<a target=_blank href=../info.htm#king>King</a>: \
	<span id=s_King></span></td>\
<td width=20% bgcolor=0 colspan=1>&nbsp;<a target=_blank href=../info.htm#bonus>Bonus</a>: \
	<span id=s_ZoneBonus></span></td>\
<td width=40% bgcolor=0 colspan=2>&nbsp;<a target=_blank href=../info.htm#guard>Guard</a>: \
	<span id=s_Guard></span></td>\
<td width=20% bgcolor=0 colspan=1>&nbsp;<a target=_blank href=../info.htm#runes>Runes</a>: \
	<span id=s_Runes></span></td>\
<td background='"+top.y+"side.jpg' rowspan=6><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
</tr>\
<tr>\
"+hi1+"tax>Tax</a>: <span id=s_Tax></span>%</td>\
"+hi1+"mrl>Morale</a>: <span id=s_Moral></span>%</td>\
"+hi1+"pop>Pop</a>: <span id=s_Pop></span></td>\
"+hi1+"fod>Fod</a>: <span id=s_Food></span></td>\
"+hi1+"trs>Trs</a>: <span id=s_Tres></span></td>\
</tr>\
<tr>\
"+hi1+"army>Army</a>::</td>\
"+hi1+"sol>Sol</a>: <span id=s_Soldiers></span></td>\
"+hi1+"arc>Arc</a>: <span id=s_Archers></span></td>\
"+hi1+"cat>Cat</a>: <span id=s_Catapults></span></td>\
"+hi1+"trb>Trb</a>: <span id=s_Trebuchets></span></td>\
</tr>\
<tr>\
"+hi1+"walls>Walls</a>::</td>\
"+hi1+"n>N</a>: <span id=s_WallN></span></td>\
"+hi1+"s>S</a>: <span id=s_WallS></span></td>\
"+hi1+"e>E</a>: <span id=s_WallE></span></td>\
"+hi1+"w>W</a>: <span id=s_WallW></span></td>\
</tr>\
<tr>\
"+hi1+"moats>Moats</a>::</td>\
"+hi1+"n>N</a>: <span id=s_MoatN></span></td>\
"+hi1+"s>S</a>: <span id=s_MoatS></span></td>\
"+hi1+"e>E</a>: <span id=s_MoatE></span></td>\
"+hi1+"w>W</a>: <span id=s_MoatW></span></td>\
</tr>\
<tr>\
"+hi1+"cannons>Cannons</a>::</td>\
"+hi1+"n>N</a>: <span id=s_CannonN></span></td>\
"+hi1+"s>S</a>: <span id=s_CannonS></span></td>\
"+hi1+"e>E</a>: <span id=s_CannonE></span></td>\
"+hi1+"w>W</a>: <span id=s_CannonW></span></td>\
</tr>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center colspan=5><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
</table>\
<center><img border=0 src='"+top.y+"c.gif' height=8 width=1><br><a href='javascript:genfull(\"options\",15,1);'><img border=0 src='"+top.y+"Card50.gif' height=20 width=15></a><img border=0 src='"+top.y+"c.gif' height=8 width=2><img border=0 src='"+top.y+"ButDash.gif'><img border=0 src='"+top.y+"c.gif' height=8 width=1><a target=_blank href=../order/index.html><img border=0 src='"+top.y+"ButBuyItems.gif'></a><img border=0 src='"+top.y+"ButDash.gif'><a href='javascript:upwindow(0)'><img border=0 src='"+top.y+"ButEntity.gif'></a><img border=0 src='"+top.y+"ButDash.gif'><a href='javascript:upwindow(1)'><img border=0 src='"+top.y+"ButInventory.gif'></a><img border=0 src='"+top.y+"ButDash.gif'><a href='javascript:upwindow(2)'><img border=0 src='"+top.y+"ButMap.gif'></a></center>\
</td>\
</tr>\
<tr><td width=100% colspan=2><table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
	<tr>\
		<td background='"+top.y+"side.jpg' rowspan=4 width=0>\
			<img border=0 src='"+top.y+"side.jpg' width=10 height=44>\
		</td>\
		<form onsubmit='pollzero(this,0);return false;' name=general id=general action="+httpspath()+"rwk.cgi target=poll method=POST><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=otherb value=\"none\">\
		<td width=100% bgcolor=0><span id=s_ActionDelay></span>&nbsp;<a href=../actions.htm target=_blank>Actions</a>: <select size=1 NAME=action onchange=updateaction(this.options[this.selectedIndex].value,document.getElementById('general'))>\
			<option value=fight>New Fight\
			<option value=battle>Battle\
			<option value=duel>Duel\
			<option value=move>Move\
			<option value=skills>Skills\
			<option value=tele>Teleport\
			<option value=sail>Set Sail\
			<option value=buy>Buy\
			<option value=sell>Sell\
			<option value=equip>Equip\
			<option value=ts>Craft\
			<option value=es>Enchant\
			<option value=ds>Disenchant\
			<option value=give>Give Gold\
			<option value=givek>Give Kingdom\
			<option value=trade>Trade\
			<option value=viewtops>View Tops\
			<option value=options>Options\
			<option value=burn>DESTROY\
			</select>\
			<span id=s_targettext></span>\
			<select size=1 NAME=target onchange=null></select>\
			<span id=s_othertext></span>\
			<select size=1 NAME=other onchange=null></select>\
			<span id=s_otheratext></span>\
			<input name=othera type=text size=9>\
			<span id=s_subbutNO><img src='"+top.y+"submitg.jpg' title=Submit width=60 height=18 border=0></span><span id=s_subbut><input type=image src='"+top.y+"submit.jpg'"+top.hio+"title=Submit width=60 height=18 border=0></span>\
		</td></form>\
		<td background='"+top.y+"side.jpg' rowspan=4 width=0>\
			<img border=0 src='"+top.y+"side.jpg' width=10 height=44>\
		</td>\
	</tr>\
	<tr>\
		<form onsubmit='pollzero(this,0);return false;' name=king id=king action="+httpspath()+"rwk.cgi target=poll method=POST><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=otherb value=\"none\">\
		<td width=100% bgcolor=0>&nbsp;<a href=../actions.htm#kd target=_blank>Kingdom</a>: <select size=1 NAME=action onchange=updateaction(this.options[this.selectedIndex].value,document.getElementById('king'))>\
			<option value=settle>Settle\
			<option value=bribe>Bribe Serfs\
			<option value=pay>Pay Serfs\
			<option value=coup>Incite Coup\
			<option value=guard>Guard\
			<option value=tax>Tax\
			<option value=rune>Runes\
			<option value=food>Buy Food\
			<option value=embezzle>Embezzle\
			<option value=deposit>Deposit\
			<option value=army>Build Army\
			<option value=fortify>Fortify\
			<option value=war>Wage War\
			<option value=assault>Blind Charge\
			<option value=transport>Transport\
			</select>\
			<span id=s_targetkingtext></span>\
			<select size=1 NAME=target onchange=null></select>\
			<span id=s_otherkingtext></span>\
			<select size=1 NAME=other onchange=null></select>\
			<span id=s_otherakingtext></span>\
			<input name=othera type=text size=9>\
			<span id=s_subbut2NO><img src='"+top.y+"submitg.jpg' title=Submit width=60 height=18 border=0></span><span id=s_subbut2><input type=image src='"+top.y+"submit.jpg'"+top.hio+"title=Submit width=60 height=18 border=0></span>\
		</td></form>\
	</tr>\
	<tr>\
		<td width=100% bgcolor=0 align=center>\
		<span id=s_FightWin></span>\
		</td>\
	</tr>\
	<tr>\
		<td width=100% bgcolor=0 align=center><span id=s_Response></span></td>\
	</tr>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
</table></td>\
</tr>\
<tr><td width=100% colspan=2><table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
<tr>\
<td background='"+top.y+"side.jpg' rowspan=2><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
<form onsubmit='pollzero(this,0);return false;' name=chat id=chat action="+httpspath()+"rwk.cgi target=poll method=POST><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=action value=\"chat\"><input type=hidden name=otherb value=\"none\"><td width=100% bgcolor=0>\
&nbsp;Chat: <input name=target type=text size=55 maxlength=140>\
 <span id=s_chatbutNO><img src='"+top.y+"submitg.jpg' title=Submit width=60 height=18 border=0></span><span id=s_chatbut><input type=image src='"+top.y+"submit.jpg'"+top.hio+"title=Submit width=60 height=18 border=0></span>\
 <select size=1 NAME=other>\
</select>\
 <span id=s_quickie></span>\
</td></form>\
<script>\
chat.target.style.width=\"60%\";\
chat.other.length=4;\
chat.other.options[0].text=\"SHOUT\";\
chat.other.options[0].value=0;\
chat.other.options[1].text=\"KINGDOM\";\
chat.other.options[1].value=1;\
chat.other.options[2].text=\"AUCTION\";\
chat.other.options[2].value=2;\
chat.other.options[3].text=\"EMOTE\";\
chat.other.options[3].value=3;\
</script>\
<td background='"+top.y+"side.jpg' rowspan=2><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
</tr>\
<tr>\
<td width=100% bgcolor=0><span id=s_Chat></span></td>\
</tr>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
</table></td>\
</tr>\
<tr><td width=100% colspan=2><table border=0 width=100% cellspacing=0 cellpadding=0 bgcolor=#808080>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center colspan=3><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
<tr>\
<td rowspan=4 background='"+top.y+"side.jpg'><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
<td bgcolor=0 width=0><img border=0 src='"+top.y+"dragon.jpg'></td>\
<td width=100% bgcolor=0><center><span id=s_Banner><a href=\"https://nd1.nodiatis.com/index.htm?4\"><img border=0 src='../234x60lady.jpg'></a></span><br><font color=#ffffff size=2>©"+new Date().getFullYear()+"\
	<a href=http://www.glitchless.com/index.html target=_blank>Glitchless</a> All Rights Reserved -\
	<a href=../pp.htm target=_blank>Privacy\
	Policy</a> - <a href=../tou.htm target=_blank>Terms of Use</a> - <a href=../faq.htm target=_blank>FAQ</a> - <a href=http://forums.racewarkingdoms.com/forums/race-war-kingdoms-forums/ target=_blank>Forums</a></font></center></td>\
<td bgcolor=#000000 width=0 align=right>\
	<img border=0 src='"+top.y+"minotaur.jpg'></td>\
<td rowspan=4 background='"+top.y+"side.jpg'><img border=0 src='"+top.y+"side.jpg' width=10 height=44></td>\
</tr>\
<tr><form action="+httpspath()+"rw.cgi target=poll2 method=POST name=refresher id=refresher><td colspan=3 bgcolor=0><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=action value=\"refresh\"><input type=hidden name=otherb value=\"none\"></td></form></tr>\
<tr><form action="+httpspath()+"rw.cgi target=poll2 method=POST name=poller id=poller><td colspan=3 bgcolor=0><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=action value=\"poll\"><input type=hidden name=target value=\"none\"><input type=hidden name=other value=\"none\"><input type=hidden name=othera value=\"none\"><input type=hidden name=otherb value=\"none\"></td></form></tr>\
<tr><form action="+httpspath()+"rwk.cgi target=poll method=POST name=skipform id=skipform><td colspan=3 bgcolor=0><input type=hidden name=login value=\"",top.login,"\"><input type=hidden name=timing value=\"",top.timings,"\"><input type=hidden name=password value=\"",top.password,"\"><input type=hidden name=action value=\"poll\"><input type=hidden name=target value=\"none\"><input type=hidden name=other value=\"none\"><input type=hidden name=othera value=\"none\"><input type=hidden name=otherb value=\"none\"></td></form></tr>\
<tr>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
<td background='"+top.y+"top.jpg' align=center colspan=3><img border=0 src='"+top.y+"top.jpg' width=44 height=10></td>\
<td width=0 height=0><img border=0 src='"+top.y+"corner.jpg' width=10 height=10></td>\
</tr>\
</table></td>\
</tr>\
</table>\
<span id=s_ButtFunk></span>\
<STYLE>\
    .vis1 { visibility:visible }\
    .vis2 { visibility:hidden }\
</STYLE>\
<div id=pokertable STYLE=\"visibility:hidden;font-family:western;font-weight:bold;font-size:12;position:absolute;\">\
<img name=PokerBG STYLE=\"position:absolute;left:0;top:0;Z-INDEX:1;\" src='"+top.y+"bg.jpg' border=0>\
<img name=PokerFold onclick='javascript:genfun(\"pfold\")'",hio,"STYLE=\"position:absolute;left:303;top:13;Z-INDEX:2;\"src='"+top.y+"fold.jpg' border=0>\
<img name=PokerCall onclick='javascript:genfun(\"pcall\")'",hio,"STYLE=\"position:absolute;left:187;top:36;Z-INDEX:2;\"src='"+top.y+"call.jpg' border=0>\
<img name=PokerPlay onclick='javascript:genfun(\"pplay\")' title='Costs 10 ash to play a hand and raises in 10 ash increments.'",hio,"STYLE=\"position:absolute;left:187;top:36;Z-INDEX:3;\"src='"+top.y+"play.jpg' border=0>\
<img name=PokerRaise1 onclick='javascript:genfun(\"praise1\")'",hio,"STYLE=\"position:absolute;left:187;top:81;Z-INDEX:2;\"src='"+top.y+"raise1.jpg' border=0>\
<img name=PokerRaise2 onclick='javascript:genfun(\"praise2\")'",hio,"STYLE=\"position:absolute;left:187;top:104;Z-INDEX:2;\"src='"+top.y+"raise2.jpg' border=0>\
<img name=PokerRaise3 onclick='javascript:genfun(\"praise3\")'",hio,"STYLE=\"position:absolute;left:187;top:127;Z-INDEX:2;\"src='"+top.y+"raise3.jpg' border=0>\
<img name=PokerX onclick='javascript:genfull(\"options\",15,0);'",hio,"STYLE=\"position:absolute;left:687;top:13;Z-INDEX:2;\"src='"+top.y+"x.jpg' border=0>\
<img name=PokerCard1 STYLE=\"position:absolute;left:13;top:36;Z-INDEX:2;\"src='"+top.y+"card1.gif' border=0>\
<img name=PokerCard2 STYLE=\"position:absolute;left:100;top:36;Z-INDEX:2;\"src='"+top.y+"card2.gif' border=0>\
<img name=PokerCard3 STYLE=\"position:absolute;left:274;top:36;Z-INDEX:2;\"src='"+top.y+"card3.gif' border=0>\
<img name=PokerCard4 STYLE=\"position:absolute;left:361;top:36;Z-INDEX:2;\"src='"+top.y+"card4.gif' border=0>\
<img name=PokerCard5 STYLE=\"position:absolute;left:448;top:36;Z-INDEX:2;\"src='"+top.y+"card5.gif' border=0>\
<img name=PokerCard6 STYLE=\"position:absolute;left:535;top:36;Z-INDEX:2;\"src='"+top.y+"card6.gif' border=0>\
<img name=PokerCard7 STYLE=\"position:absolute;left:622;top:36;Z-INDEX:2;\"src='"+top.y+"card7.gif' border=0>\
<img name=RJ1 width=23 height=30 onclick='javascript:genfun(\"rj1\")'",hix,"STYLE=\"position:absolute;left:25;top:109;Z-INDEX:3;\"src='"+top.y+"card24.gif' border=0>\
<img name=BJ1 width=23 height=30 onclick='javascript:genfun(\"bj1\")'",hix,"STYLE=\"position:absolute;left:35;top:114;Z-INDEX:4;\"src='"+top.y+"card50.gif' border=0>\
<img name=RQ1 width=23 height=30 onclick='javascript:genfun(\"rq1\")'",hix,"STYLE=\"position:absolute;left:61;top:109;Z-INDEX:3;\"src='"+top.y+"card25.gif' border=0>\
<img name=BQ1 width=23 height=30 onclick='javascript:genfun(\"bq1\")'",hix,"STYLE=\"position:absolute;left:71;top:114;Z-INDEX:4;\"src='"+top.y+"card51.gif' border=0>\
<img name=RK1 width=23 height=30 onclick='javascript:genfun(\"rk1\")'",hix,"STYLE=\"position:absolute;left:61;top:73;Z-INDEX:3;\"src='"+top.y+"card26.gif' border=0>\
<img name=BK1 width=23 height=30 onclick='javascript:genfun(\"bk1\")'",hix,"STYLE=\"position:absolute;left:71;top:78;Z-INDEX:4;\"src='"+top.y+"card52.gif' border=0>\
<img name=RA1 width=23 height=30 onclick='javascript:genfun(\"ra1\")'",hix,"STYLE=\"position:absolute;left:61;top:37;Z-INDEX:3;\"src='"+top.y+"card14.gif' border=0>\
<img name=BA1 width=23 height=30 onclick='javascript:genfun(\"ba1\")'",hix,"STYLE=\"position:absolute;left:71;top:42;Z-INDEX:4;\"src='"+top.y+"card40.gif' border=0>\
<img name=RJ2 width=23 height=30 onclick='javascript:genfun(\"rj2\")'",hix,"STYLE=\"position:absolute;left:112;top:109;Z-INDEX:3;\"src='"+top.y+"card24.gif' border=0>\
<img name=BJ2 width=23 height=30 onclick='javascript:genfun(\"bj2\")'",hix,"STYLE=\"position:absolute;left:122;top:114;Z-INDEX:4;\"src='"+top.y+"card50.gif' border=0>\
<img name=RQ2 width=23 height=30 onclick='javascript:genfun(\"rq2\")'",hix,"STYLE=\"position:absolute;left:148;top:109;Z-INDEX:3;\"src='"+top.y+"card25.gif' border=0>\
<img name=BQ2 width=23 height=30 onclick='javascript:genfun(\"bq2\")'",hix,"STYLE=\"position:absolute;left:158;top:114;Z-INDEX:4;\"src='"+top.y+"card51.gif' border=0>\
<img name=RK2 width=23 height=30 onclick='javascript:genfun(\"rk2\")'",hix,"STYLE=\"position:absolute;left:148;top:73;Z-INDEX:3;\"src='"+top.y+"card26.gif' border=0>\
<img name=BK2 width=23 height=30 onclick='javascript:genfun(\"bk2\")'",hix,"STYLE=\"position:absolute;left:158;top:78;Z-INDEX:4;\"src='"+top.y+"card52.gif' border=0>\
<img name=RA2 width=23 height=30 onclick='javascript:genfun(\"ra2\")'",hix,"STYLE=\"position:absolute;left:148;top:37;Z-INDEX:3;\"src='"+top.y+"card14.gif' border=0>\
<img name=BA2 width=23 height=30 onclick='javascript:genfun(\"ba2\")'",hix,"STYLE=\"position:absolute;left:158;top:42;Z-INDEX:4;\"src='"+top.y+"card40.gif' border=0>\
<img onclick='javascript:orient(1)'",hio,"STYLE=\"position:absolute;left:671;top:1;height:8;width:8;Z-INDEX:2;\"src='"+top.y+"ButCompassNorth.jpg' border=0>\
<img onclick='javascript:orient(2)'",hio,"STYLE=\"position:absolute;left:680;top:1;height:8;width:8;Z-INDEX:2;\"src='"+top.y+"ButCompassSouth.jpg' border=0>\
<img onclick='javascript:orient(3)'",hio,"STYLE=\"position:absolute;left:689;top:1;height:8;width:8;Z-INDEX:2;\"src='"+top.y+"ButCompassWest.jpg' border=0>\
<img onclick='javascript:orient(4)'",hio,"STYLE=\"position:absolute;left:698;top:1;height:8;width:8;Z-INDEX:2;\"src='"+top.y+"ButCompassEast.jpg' border=0>\
<font color=#FFFFFF size=2>\
<span id=PokerBet STYLE=\"opacity:0.5;position:absolute;left:47;top:15;Z-INDEX:2;filter:alpha(opacity:50);\">-</span>\
<span id=PokerToCall STYLE=\"opacity:0.5;position:absolute;left:129;top:15;Z-INDEX:2;filter:alpha(opacity:50);\">-</span>\
<span id=PokerMaxBet STYLE=\"opacity:0.5;position:absolute;left:219;top:15;Z-INDEX:2;filter:alpha(opacity:50);\">-</span>\
<span id=PokerPot STYLE=\"opacity:0.5;position:absolute;left:279;top:15;Z-INDEX:2;filter:alpha(opacity:50);\"></span>\
<span id=PokerMessage STYLE=\"opacity:0.5;width:300;position:absolute;left:395;top:15;Z-INDEX:5;filter:alpha(opacity:50);\">-</span>\
<span id=PokerAsh STYLE=\"opacity:0.5;position:absolute;left:639;top:15;Z-INDEX:2;filter:alpha(opacity:50);\">-</span>\
</font>\
<font color=0 size=2>\
<span STYLE=\"opacity:0.77;position:absolute;left:16;top:15;Z-INDEX:2;filter:alpha(opacity:77);\">BET:</span>\
<span STYLE=\"opacity:0.77;position:absolute;left:67;top:15;Z-INDEX:2;filter:alpha(opacity:77);\">TO CALL:</span>\
<span STYLE=\"opacity:0.77;position:absolute;left:155;top:15;Z-INDEX:2;filter:alpha(opacity:77);\">MAX BET:</span>\
<span STYLE=\"opacity:0.77;position:absolute;left:246;top:15;Z-INDEX:2;filter:alpha(opacity:77);\">POT:</span>\
<span STYLE=\"opacity:0.77;position:absolute;left:607;top:15;Z-INDEX:2;filter:alpha(opacity:77);\">ASH:</span>\
</font>\
</div>\
</body>\
</html>\
");
black(document.getElementById('chat').target);
black(document.getElementById('chat').other);
black(document.getElementById('king').action);
black(document.getElementById('king').target);
black(document.getElementById('king').other);
black(document.getElementById('king').othera);
black(document.getElementById('general').action);
black(document.getElementById('general').target);
black(document.getElementById('general').other);
black(document.getElementById('general').othera);
top.NoFights=0;
top.Target=-1;
top.Health=0;
top.TargetHealth=0;
upwindow(0);
upcreatures();
upplayers();
updateaction(document.getElementById('general').action.options[document.getElementById('general').action.options.selectedIndex].value,document.getElementById('general'));
updateaction(document.getElementById('king').action.options[document.getElementById('king').action.options.selectedIndex].value,document.getElementById('king'));
upbars();
top.frames.main.s_Response.innerHTML="";
top.Update=0;
top.TargetRaceSex=0;
top.ActionDelay=0;
top.ActionInc=1;
top.PendingLastAction="";
top.LastAction="";
top.frames.main.updelay();
pollzero(refresher,1);
top.dActionInc=60000;
upwindow(0);
s_name.innerHTML=top.login;
top.Timer=setInterval("top.frames.main.dopoll(400)","500");
setInterval("top.frames.main.pupdate()","1000");
}
//-->
