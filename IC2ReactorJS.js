


/*
  ReactorGrid class:
    stores reactor grid info into one structure
    for easy function passing.

    Stores the rows in the reactor, each row is a Row class.

*/
class ReactorGrid
{

  constructor(a, b, c, d, e, f)


    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;

  }

  }

  /*

  Row class:
    stores each part in an array in a row.
    constructors are slot classes

  */
  class Row
  {

    constructor(one, two, three, four, five, six, seven, eight, nine)
    {

      this.one = one;
      this.two = two;
      this.three = three;
      this.four = four;
      this.five = five;
      this.six = six;
      this.seven = seven;
      this.eight = eight;
      this.nine = nine;

    }
  }

/*
  Slot class:
    stores info about the slot

      WIP: Current info
        part type - part


*/
class Slot
{

  constructor(part)
  {

    this.part = part;

  }

}

class Selectors
{

  constructor()
  {
    this.blank = getId("blank");
    this.singleU = getId("singleU");
    this.dualU = getId("dualU");
    this.quadU = getId("quadU");
    this.singleMOX = getId("singleMOX");
    this.dualMOX = getId("dualMOX");
    this.quadMOX = getId("quadMOX");
    this.weakReflect = getId("weakReflect");
    this.reflect = getId("reflect");
    this.vent = getId("vent");
    this.diaVent = getId("diaVent");
    this.coreVent = getId("coreVent");
    this.spreadVent = getId("spreadVent");
    this.goldVent = getId("goldVent");
    this.singleWater = getId("singleWater");
    this.dualWater = getId("dualWater");
    this.quadWater = getId("quadWater");
    this.heatSwitch = getId("heatSwitch");
    this.diaSwitch = getId("diaSwitch");
    this.coreSwitch = getId("coreSwitch");
    this.spreadSwitch = getId("spreadSwitch");
    this.plate = getId("plate");
    this.heatPlate = getId("heatPlate");
    this.xpPlate = getId("xpPlate");
    this.cond = getId("cond");
    this.lapCond = getId("lapCond");
    this.singleThor = getId("singleThor");
    this.dualThor = getId("dualThor");
    this.quadThor = getId("quadThor");
    this.singleHelium = getId("singleHelium");
    this.dualHelium = getId("dualHelium");
    this.quadHelium = getId("quadHelium");
    this.singleNak = getId("singleNak");
    this.dualNak = getId("dualNak");
    this.quadNak = getId("quadNak");
    this.unbreakReflect = getId("unbreakReflect");
    this.active = getId("blank");
  }
}

function onLoad()
{




}


function getId(name)
{
  return document.getElementById(name);
}



function select()
{






}
