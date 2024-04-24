class Base_Machine {
  Base_signal() {
    console.log("베이스 보관함이 동작 신호를 받습니다.");
  }
  Base_movement() {
    console.log("베이스 보관함에서 베이스가 3초간 나오고 멈춥니다.");
  }
  Base_complete() {
    console.log("아이스크림에 베이스가 추가되었습니다.");
    console.log("----------------------------------------------");
  }
}

class Flavor_Machine {
  Flavor_signal() {
    console.log("시럽 보관함이 동작 신호를 받습니다.");
  }
  Flavor_movement() {
    console.log("시럽 보관함에서 시럽이 3초간 나오고 멈춥니다.");
  }
  Flavor_complete() {
    console.log("아이스크림에 시럽이 추가되었습니다.");
    console.log("----------------------------------------------");
  }
}

class Topping_Machine {
  Topping_signal() {
    console.log("사탕 보관함이 동작 신호를 받습니다.");
  }
  Topping_movement() {
    console.log("사탕 보관함에서 사탕이 3초간 나오고 멈춥니다.");
  }
  Topping_complete() {
    console.log("아이스크림에 사탕이 추가되었습니다.");
    console.log("----------------------------------------------");
  }
}

//strategy pattern
class Making {
  setUnit(unit){
    this.unit = unit;
  };
  make() {
    this.unit.make();
  };
  cool() {
    console.log("아이스크림을 냉각합니다.");
  }
  pack() {
    console.log("아이스크림을 포장합니다.");
  }
}

class MakeBar{
  make(){
    console.log("막대바 형태로 제작합니다.");
  };
};

class MakeTube{
  make(){
    console.log("쭈쭈바 형태로 제작합니다.");
  };
};

class MakeCorn{
  make(){
    console.log("콘 아이스크림 형태로 제작합니다.");
  };
};

//facade pattern
class Main_Robot {
  constructor() {
    this.baseMachine = new Base_Machine();
    this.flavorMachine = new Flavor_Machine();
    this.toppingMachine = new Topping_Machine();
    this.making = new Making();
  }

  Add_icecream() {
    this.baseMachine.Base_signal();
    this.baseMachine.Base_movement();
    this.baseMachine.Base_complete();

    this.flavorMachine.Flavor_signal();
    this.flavorMachine.Flavor_movement();
    this.flavorMachine.Flavor_complete();

    this.toppingMachine.Topping_signal();
    this.toppingMachine.Topping_movement();
    this.toppingMachine.Topping_complete();

    this.making.setUnit(new MakeCorn);
    this.making.make();
    this.making.cool();
    this.making.pack();
  }
}

//factory pattern
class IceCream {
  constructor(form, base, flavor, topping) {
    this.form = form; // bar, tube, corn
    this.base = base; // ice, cream, yogurt
    this.flavor = flavor; // strawberry, chocolate, banana
    this.topping = topping; // jelly, poppingCandy, chocolateBall
  }

  static factory(form, base, flavor, topping) {
    switch (form) {
      case "bar":
        return new Bar(base, flavor, topping);
      case "tube":
        return new Tube(base, flavor, topping);
      case "corn":
        return new Corn(base, flavor, topping);
      default:
        console.error("Invalid form type!");
        return null;
    }
  }
}

// Form 종류
class Bar extends IceCream {
  constructor(base, flavor, topping) {
    super("bar", base, flavor, topping);
  }
}

class Tube extends IceCream {
  constructor(base, flavor, topping) {
    super("tube", base, flavor, topping);
  }
}

class Corn extends IceCream {
  constructor(base, flavor, topping) {
    super("corn", base, flavor, topping);
  }
}

class Base {
  constructor() {
    this.name = Base.Constants.CREAM; // 속성값을 넣어줌.
  }
}
Base.Constants = {
  CREAM: "cream",
  MILK: "milk",
  SORBET: "yogurt"
};

class Flavor {
  constructor() {
    this.name = Flavor.Constants.STRAWBERRY;
  }
}
Flavor.Constants = {
  STRAWBERRY: "strawberry",
  CHOCOLATE: "chocolate",
  BANANA: "banana"
};

class Topping {
  constructor() {
    this.name = Topping.Constants.JELLY;
  }
}
Topping.Constants = {
  JELLY: "jelly",
  POPPINGCANDY: "poppingcandy",
  CHOCOLATEBALL: "chocolateball"
};

const myBase = new Base();
const myFlavor = new Flavor();
const myTopping = new Topping();

const myIceCream = IceCream.factory("corn", myBase, myFlavor, myTopping);
  console.log("메뉴표:",myIceCream);
  console.log("----------------------------------------------");

const Ice_order = new Main_Robot();
Ice_order.Add_icecream();


