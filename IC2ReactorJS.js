/*jshint esversion: 6 */

/*
  Slot class:
    stores info about the slot
      WIP: Current info
        part type - part
*/
class Slot
{

  constructor(part, loc)
  {

    this.part = part;
    this.loc = loc;
    this.canReflect = false;
    this.pulses = 0;
    this.heat = 0;
    this.dur = 0;
    this.canCool = false;
    this.maxCooling = 0;
    this.broke = false;
    this.maxHeat = 0;
  }

}

class Selectors
{
  constructor()
  {
    this.active = getId("blank");
    this.id = "blank";
  }
}

class Reactor
{

  constructor()
  {
    this.maxHeat = 10000;
    this.currentHeat = 0;
  }

}



function onLoad()
{

  var elem = document.createElement("img");
  elem.src = "assets/blank.png";
  elem.setAttribute("alt", "blank");
  elem.style.padding = 0;
  elem.style.margin = 0;

  up = 0;
  down = 0;
  left = 0;
  right = 0;

  var i = 0;
  var a = 0;
  var loca;

  selectorGrid = new Selectors();
  grid = [1, 2, 3, 4, 5, 6];

  for( i = 0; i < 6; i++ )
  {
    grid[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for( a = 0; a < 9; a++ )
    {
      loca = "" + i + a;
      grid[i][a] = new Slot("blank", loca);
    }
  }

  reactor = new Reactor();

  validReflect = ["singleU", "dualU", "quadU", "singleMOX", "dualMOX", "quadMOX", "weakReflect", "reflect", "singleThor", "dualThor", "quadThor", "unbreakReflect"];
  vents = ["vent", "diaVent", "coreVent", "spreadVent", "goldVent"];
  uranium = ["singleU", "dualU", "quadU"];
  mox = ["singleMOX", "dualMOX", "quadMOX"];
  thorium = ["singleThor", "dualThor", "quadThor"];
  switches = ["heatSwitch", "diaSwitch", "coreSwitch", "spreadSwitch"];
  coolant = ["singleWater", "dualWater", "quadWater", "singleHelium", "dualHelium", "quadHelium", "singleNak", "dualNak", "quadNak"];
  condensator = ["cond", "lapCond"];

  selectorGrid.active = getId("blank");
  selectorGrid.id = "blank";
  selectorGrid.active.style.borderColor = "red";


}


function getId(name)
{
  return document.getElementById(name);
}


function select(name)
{

  selectorGrid.active.style.borderColor = "black";
  selectorGrid.active = getId(name);
  selectorGrid.id = name;
  selectorGrid.active.style.borderColor = "red";

}

function calcMaxHeat()
{

  var i = 0;
  var c = 0;
  var total = 10000;

  for( i = 0; i < 6; i++ )
  {
    for( c = 0; c < 9; c++ )
    {
      current = grid[i][c];
      switch(current.part)
      {
        case "plate":
          total += 1000;
          break;
        case "heatPlate":
          total += 1700;
          break;
        case "xpPlate":
          total += 500;
          break;
      }
    }
  }

  reactor.maxHeat = total;
  var out = getId("maxTemp");
  out.innerHTML = "Max Reactor Hull Heat: " + total;


}

function getCard(i, c)
{

  if( i !== 0 )
  {
    up = grid[i-1][c];
  }
  else
  {
    up = null;
  }
  if( i !== 5 )
  {
    down = grid[i+1][c];
  }
  else
  {
    down = null;
  }
  if( c !== 0 )
  {
    left = grid[i][c-1];
  }
  else
  {
    left = null;
  }
  if( c !== 8 )
  {
    right = grid[i][c+1];
  }
  else
  {
    right = null;
  }

}



function simulate()
{

  calcHP();
  calcMaxHeat();
  run();


}

function setPartPulses(p)
{

  var type = 0;
  var total = 0;
  var i, c;
  i = parseInt(p.loc.charAt(0));
  c = parseInt(p.loc.charAt(1));

  switch( p.part )
  {
    case "singleU": case "singleMOX": case "singleThor":
      type = 1;
      total += 1;
      break;
    case "dualU": case "dualMOX": case "quadThor":
      type += 2;
      total = 4;
      break;
    case "quadU": case "quadMOX": case "quadThor":
      type = 4;
      total += 12;
      break;
    }

    getCard(i, c);

    if( up !== null )
      if( up.canReflect )
        total += type;
    if( down !== null )
      if( down.canReflect )
        total += type;
    if( right !== null )
      if( right.canReflect )
        total += type;
    if( left !== null )
      if( left.canReflect )
        total += type;

        p.pulses = total;

        return type;

}



function calcHP()
{

  var i, c, current, type;
  var h = 0;
  var p = 0;

  for(i = 0; i < 6; i++)
  {

    for(c = 0; c < 9; c++)
    {

      current = grid[i][c];
      //console.log(current);
      if( current.canReflect && current.part !== "weakReflect" && current.part !== "reflect" && current.part !== "unbreakReflect")
      {

        type = setPartPulses(current);

    switch(current.part)
    {
      case "singleU": case "dualU": case "quadU":
        h += ((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type;
        p += current.pulses * 5;
        break;
      case "singleMOX": case "dualMOX": case "quadMOX":
        h += ((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type;
        p += current.pulses * 5;
        break;
      case "singleThor": case "dualThor": case "quadThor":
        h += (((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type) / 4;
        p += current.pulses;
        break;

        }

      }
    }
  }

  var consoleh = getId("avgHeatOutput");
  var consolep = getId("avgEUOutput");

  consoleh.innerHTML = "Heat Generated Per Second: " + h;
  consolep.innerHTML = "Average Power Per Tick: " + p;


}



function setPart(slot)
{

  var l = slot.charAt(0);
  var num = parseInt(slot.charAt(1));
  var place;

  switch(l)
  {
    case 'a':
      place = grid[0][num-1];
      break;
    case 'b':
      place = grid[1][num-1];
      break;
    case 'c':
      place = grid[2][num-1];
      break;
    case 'd':
      place = grid[3][num-1];
      break;
    case 'e':
      place = grid[4][num-1];
      break;
    case 'f':
      place = grid[5][num-1];
      break;
  }
          if( place.part == selectorGrid.id )
              return;
          if( validReflect.includes(selectorGrid.id) )
            place.canReflect = true;
          if( !validReflect.includes(selectorGrid.id) )
            place.canReflect = false;
          if( getId(slot).childNodes[0] !== null )
            getId(slot).removeChild(getId(slot).childNodes[0]);
          if( vents.includes(selectorGrid.id) )
          {
            place.dur = 1000;
            place.maxHeat = 1000;
            place.canCool = true;
            switch(selectorGrid.id)
            {
              case "vent":
                place.maxCooling = 6;
                break;
              case "diaVent":
                place.maxCooling = 12;
                break;
              case "coreVent":
                place.maxCooling = 5;
                break;
              case "goldVent":
                place.maxCooling = 20;
                break;
            }
          }
          if(uranium.includes(selectorGrid.id))
          {
            place.dur = 20000;
          }
          if (mox.includes(selectorGrid.id))
          {
            place.dur = 10000;
          }
          if (thorium.includes(selectorGrid.id))
          {
            place.dur = 100000;
          }
          if(selectorGrid.id == "weakReflect")
          {
            place.dur = 20000;
          }
          if(selectorGrid.id == "reflect")
          {
            place.dur = 80000;
          }
          if(vents.includes(selectorGrid.id))
          {
            place.dur = 1000;
            place.maxHeat = 1000;
          }
          var pic = "assets/" + selectorGrid.id + ".png";

          var elem = document.createElement("img");
          elem.src = pic;
          elem.setAttribute("alt", slot);
          elem.style.padding = 0;
          elem.style.margin = 0;
          getId(slot).appendChild(elem);

          place.part = selectorGrid.id;

}
function run()
{
  var i, c, current, type, heat, partHeat, leftoverHeat, percentUp, percentDown, percentLeft, percentRight, reactorPercent;
  var coolPart;
  var percents, partPercents, reactorPercent, avg;

  while(checkFuel())
  {
    for(i = 0; i < 6; i++)
    {
      for (c = 0; c < 9; c++)
      {
        current = grid[i][c];
        if(uranium.includes(current.part))
        {
          switch(current.part)
          {
            case "singleU":
              heat = (current.pulses *(current.pulses + 1)) * 2;
              break;
            case "dualU":
              heat = (((current.pulses/2)*((current.pulses/2) + 1)) * 2) * 2;
              break;
            case "quadU":
              heat = (((current.pulses/4)*((current.pulses/4) + 1)) * 2) * 4;
          }
          getCard(i, c);
          coolPart = findCoolPart(i, c);
          partHeat = Math.trunc(heat/coolPart);
          leftoverHeat = heat%coolPart;
          spreadHeat(coolPart, heat);
        }
        if(mox.includes(current.part))
        {
          switch(current.part)
          {
            case "singleMOX":
              heat = (current.pulses *(current.pulses + 1)) * 2;
              break;
            case "dualMOX":
              heat = (((current.pulses/2)*((current.pulses/2) + 1)) * 2) * 2;
              break;
            case "quadMOX":
              heat = (((current.pulses/4)*((current.pulses/4) + 1)) * 2) * 4;
          }
          getCard(i, c);
          coolPart = findCoolPart(i, c);
          partHeat = Math.trunc(heat/coolPart);
          leftoverHeat = heat%coolPart;
          spreadHeat(coolPart, heat);
        }
        if(thorium.includes(current.part))
        {
          switch(current.part)
          {
            case "singleThor":
              heat = (current.pulses *(current.pulses + 1)) * 2;
              break;
            case "dualThor":
              heat = (((current.pulses/2)*((current.pulses/2) + 1)) * 2) * 2;
              break;
            case "quadThor":
              heat = (((current.pulses/4)*((current.pulses/4) + 1)) * 2) * 4;
          }
          getCard(i, c);
          coolPart = findCoolPart(i, c);
          partHeat = Math.trunc(heat/coolPart);
          leftoverHeat = heat%coolPart;
          spreadHeat(coolPart, heat);
        }
        if(vents.includes(current.part))
        {
          switch(current.part)
          {
            case "vent":
              current.dur += 6 + (4 * componentHeatBuff(current, i, c));
              ventCheck(current);
              break;
            case "diaVent":
              current.dur += 12 + (4 * componentHeatBuff(current, i, c));
              ventCheck(current);
              break;
            case "coreVent":
              reactor.currentHeat -= 5;
              reactorHeatReset();
              current.dur += 5 + (4 * componentHeatBuff(current, i, c));
              ventCheck(current);
              break;
            case "goldVent":
              reactor.currentHeat -= 36;
              reactorHeatReset();
              current.dur += 20 + (4 * componentHeatBuff(current, i, c));
              ventCheck(current);
              break;
          }
        }
        if(switches.includes(current.part))
        {
          switch(current.part)
          {
            case "heatSwitch":
              percents = findPartPercent(current, i, c, percentUp, percentDown, percentLeft, percentRight);
              reactorPercent = findReactorPercent(reactorPercent);
              partPercents = currentPercent(current);
              avg = getAvg(percents, partPercents, reactorPercent, "oi");
              break;
            case "diaSwitch":
              percents = findPartPercent(current, i, c, percentUp, percentDown, percentLeft, percentRight);
              reactorPercent = findReactorPercent(reactorPercent);
              partPercents = currentPercent(current);
              avg = getAvg(percents, partPercents, reactorPercent, "oi");
              break;
            case "spreadSwitch":
              percents = findPartPercent(current, i, c, percentUp, percentDown, percentLeft, percentRight);
              partPercents = currentPercent(current);
              avg = getAvg(percents, partPercents, "welp", "part");
              break;
            case "coreSwitch":
              reactorPercent = findReactorPercent(reactorPercent);
              partPercents = currentPercent(current);
              avg = getAvg("hmm", "partPercents", "reactorPercent", "core");
              break;
          }
        }
      }
    }
  }

}

function getAvg(card, current, r, type)
{
  if(type !== "core")
  {
  var n = card[0];
  var s = card[1];
  var w = card[2];
  var e = card[3];
  return (n + s + w + e + r + current) / 6;
  }
  else if(type === "part")
  {
    var n = card[0];
    var s = card[1];
    var w = card[2];
    var e = card[3];
    return (n + s + w + e + current) / 5;
  }
  else
  {
    return (r + current) / 2;
  }
}


function currentPercent(current)
{

  return (current.dur / current.maxHeat) * 100;

}

function checkFuel()
{
  var i, c, current;
  for(i = 0; i < 6; i++)
  {
    for(c = 0; c < 9; c++)
    {
      current = grid[i][c];
      if(uranium.includes(current.part) || mox.includes(current.part) || thorium.includes(current.part) && current.dur > 0)
      {
        return true;
      }
    }
  }
  return false;
}
function findCoolPart(i, c)
{
  coolPart = 0;
  getCard(i, c);
  if(up !== null)
    if(up.canCool && !up.broke )
      coolPart += 1;
  if(down !== null)
    if(down.canCool && !down.broke)
      coolPart +=1;
  if(left !== null)
    if(left.canCool && !left.broke)
      coolPart += 1;
  if(right !== null)
    if(right.canCool && !right.broke)
      coolPart +=1;
  return coolPart;
}
function spreadHeat(coolPart, heat)
{
  if(up !== null)
    if(up.canCool && !up.broke)
      up.dur -= partHeat;
  if(down !== null)
    if(down.canCool && !down.broke)
      down.dur -= partHeat;
  if(left !== null)
    if(left.canCool && !left.broke)
      left.dur -= partHeat;
  if(right !== null)
    if(right.canCool && !right.broke)
      right.dur -= partHeat;
  if(down !== null)
    if(down.canCool && !down.broke)
      down.dur -= leftoverHeat;
        if(up !== null)
          if(up.canCool && !up.broke)
            up.dur -= leftoverHeat;
  if(coolPart === 0)
    reactor.currentHeat += heat;
}
function ventCheck(current)
{
  if(current.dur > 1000)
    current.dur = 1000;
  if(current.dur <= 0)
    current.broke = true;
}
function reactorHeatReset()
{
  if(reactor.currentHeat < 0)
  {
    reactor.currentHeat = 0;
  }
}
function componentHeatBuff(current, i, c)
{
  var ventCounter = 0;
  getCard(i, c);
  if(up !== null)
    if(up.part == "spreadVent")
      ventCounter++;
  if(up !== null)
    if(down.part == "spreadVent")
      ventCounter++;
  if(up !== null)
    if(left.part == "spreadVent")
      ventCounter++;
  if(up !== null)
    if(right.part == "spreadVent")
      ventCounter++;
  return ventCounter;
}
function findPartPercent(current, i, c, percentUp, percentDown, percentLeft, percentRight)
{
  getCard(i, c);
  if(up !== null && up.canCool)
    {
      switch(current.part)
      {
        case vents.includes(current.part):
          percentUp = (current.dur/1000) * 100;
          break;
        case "heatSwitch":
          percentUp = (current.dur/2500) * 100;
          break;
        case "diaSwitch": case "singleWater":
          percentUp = (current.dur/10000) * 100;
          break;
        case "coreSwitch": case "spreadSwitch":
          percentUp = (current.dur/5000) * 100;
          break;
        case "dualWater":
          percentUp = (current.dur/30000) * 100;
          break;
        case "quadWater": case "singleHelium": case "singleNak":
          percentUp = (current.dur/60000) * 100;
          break;
        case "cond":
          percentUp = (current.dur/20000) * 100;
          break;
        case "lapCond":
          percentUp = (current.dur/100000) * 100;
          break;
        case "dualHelium": case "dualNak":
          percentUp = (current.dur/180000) * 100;
          break;
        case "quadHelium": case "quadNak":
          percentUp = (current.dur/360000) * 100;
          break;
      }
    }
    if(down !== null && down.canCool)
      {
        switch(current.part)
        {
          case vents.includes(current.part):
            percentDown = (current.dur/1000) * 100;
            break;
          case "heatSwitch":
            percentDown = (current.dur/2500) * 100;
            break;
          case "diaSwitch": case "singleWater":
            percentDown = (current.dur/10000) * 100;
            break;
          case "coreSwitch": case "spreadSwitch":
            percentDown = (current.dur/5000) * 100;
            break;
          case "dualWater":
            percentDown = (current.dur/30000) * 100;
            break;
          case "quadWater": case "singleHelium": case "singleNak":
            percentDown = (current.dur/60000) * 100;
            break;
          case "cond":
            percentDown = (current.dur/20000) * 100;
            break;
          case "lapCond":
            percentDown = (current.dur/100000) * 100;
            break;
          case "dualHelium": case "dualNak":
            percentDown = (current.dur/180000) * 100;
            break;
          case "quadHelium": case "quadNak":
            percentDown = (current.dur/360000) * 100;
            break;
        }
      }
      if(left !== null && left.canCool)
        {
          switch(current.part)
          {
            case vents.includes(current.part):
              percentLeft = (current.dur/1000) * 100;
              break;
            case "heatSwitch":
              percentLeft = (current.dur/2500) * 100;
              break;
            case "diaSwitch": case "singleWater":
              percentLeft = (current.dur/10000) * 100;
              break;
            case "coreSwitch": case "spreadSwitch":
              percentLeft = (current.dur/5000) * 100;
              break;
            case "dualWater":
              percentLeft = (current.dur/30000) * 100;
              break;
            case "quadWater": case "singleHelium": case "singleNak":
              percentLeft = (current.dur/60000) * 100;
              break;
            case "cond":
              percentLeft = (current.dur/20000) * 100;
              break;
            case "lapCond":
              percentLeft = (current.dur/100000) * 100;
              break;
            case "dualHelium": case "dualNak":
              percentLeft = (current.dur/180000) * 100;
              break;
            case "quadHelium": case "quadNak":
              percentLeft = (current.dur/360000) * 100;
              break;
          }
        }
        if(right !== null && right.canCool)
          {
            switch(current.part)
            {
              case vents.includes(current.part):
                percentRight = (current.dur/1000) * 100;
                break;
              case "heatSwitch":
                percentRight = (current.dur/2500) * 100;
                break;
              case "diaSwitch": case "singleWater":
                percentRight = (current.dur/10000) * 100;
                break;
              case "coreSwitch": case "spreadSwitch":
                percentRight = (current.dur/5000) * 100;
                break;
              case "dualWater":
                percentRight = (current.dur/30000) * 100;
                break;
              case "quadWater": case "singleHelium": case "singleNak":
                percentRight = (current.dur/60000) * 100;
                break;
              case "cond":
                percentRight = (current.dur/20000) * 100;
                break;
              case "lapCond":
                percentRight = (current.dur/100000) * 100;
                break;
              case "dualHelium": case "dualNak":
                percentRight = (current.dur/180000) * 100;
                break;
              case "quadHelium": case "quadNak":
                percentRight = (current.dur/360000) * 100;
                break;
            }
          }
  return [percentUp, percentDown, percentLeft, percentRight];
}
function findReactorPercent(reactorPercent)
{
  reactorPercent = (reactor.currentHeat/reactor.maxHeat) * 100;
  return reactorPercent;
}
