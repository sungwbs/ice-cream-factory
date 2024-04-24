# ice-cream-factory

### 소개
- 프로젝트 코드를 일반적인 반복문과 제어문보다는 디자인패턴이 코드 전반적인 부분에 본질이 되도록 하여 프로젝트를 만들었습니다.

- 먼저 주제는 아이스크림공장입니다. 주제를 아이스크림공장으로 선택한 이유는 공장에서는 여러 기계가 작업을 시작하면 각 설정된 방법으로만 기계가 작업을 수행하여 아이스크림을 만듭니다. 
 _예를 들어 토핑을 아이스크림에 부어주도록 설정된 기계만 토핑을 부어줄 수 있습니다_

- 즉, 기계는 여러 아이스크림을 만드는 것에 반복적인 작업을 수행합니다. 이러한 기계의 반복적인 작업에 대한 재사용성을 패턴으로 표현하고자 하여 디자인패턴의 일부분을 사용하였고, 사용된 패턴은 의미 있는 결합을 통해 코드의 효율성과 재사용성을 높여 만들어보았습니다. 

<br/> 

### 전반적으로 프로젝트에 동작에 대한 설계 내용 ↓
 - 고객은 각각 베이스, 향신료, 토핑의 세 가지 요소를 선택하며, 제작 기계는 할당된 시간동안 선택 받은 요소의 컨테이너의 입구를 연다. 모든 요소가 투입되면 혼합하며, 고객은 혼합물을 막대바, 쭈쭈바, 콘 중 원하는 유형의 아이스크림으로 선택한다. 선택된 유형에 따른 제작이 수행되며, 최종적으로 냉각과 포장을 수행하여 제품을 출하한다. 코드는 판매 키오스크보다 커스텀 아이스크림 제작 기계의 내부 소프트웨어 설계를 목표로 하였다.

> 1. 팩토리 메서드는 부모 클래스에서 객체들을 생성할 수 있는 인터페이스를 제공하지만, 자식 클래스들이 생성될 객체들의 유형을 변경할 수 있도록 하는 생성 패턴입니다.
class IceCream 안에서 this . 속성을 통해 불러오는 방식으로 만들어놓았습니다.    그 이후 기준이 되는 form에는 bar, Tube, Corn 세 가지를 정해놨습니다. switch 문을 통해서 세 가지 중 하나가 true 가 되면 각 클래스 base, flavor, topping 의 속성값을 가져온 후 정해줍니다. **※ 참고로 코드에서는 입출력보다 설계 구현을 우선순위로 두었기에 상수값으로 정하였습니다! ** 이렇게 팩토리 매서드는 새로운 객체를 만들기 위한 작업을 한곳에서 관리하기 쉽게 하기 위해 사용되었습니다.

ex.1) { **form** : Tube, **base** : cream, **flavor** : chocolate, **topping** : jelly } 
ex.2) { **form** : bar, **base** : cream, **flavor** : strawberry, **topping** : poppingCandy } 


```c
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
```

> 2. 퍼사드패턴입니다. 퍼사드패턴은 여러 개의 로직들을 하나의 매서드를 통해 불러오는 패턴입니다. 밑에 코드를 보시면 각 Base, Flavor, Topping에 대한 기계의 로직들을 구현해 놓은 것을 볼 수 있습니다. 앞에서 말했듯이 기계는 반복적인 일을 위한 로직이 필요함으로 반복 구현이 가능하도록 구현했습니다. 

```c
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
```
> 3. 전략패턴입니다. 전략패턴은 퍼사드패턴과 쉽게 보면은 비슷하기도 한 패턴입니다. 전략패턴은 각 개인화를 시켜줄 수 있는 로직들을 구현해놓고 각각에 필요에 따라 매서드 로직을 바꾸어 출력해주는 역할을 합니다. 쉽게 말해서 make() 함수로 로직을 불러오는 과정에서 "막대바 로직"을 불러올지 "쭈쭈바 로직"을 불러올지 등 하나의 함수 안에 로직을 교체하여 사용하는 패턴입니다. 

```c
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
```

> 4. 다음은 퍼사드패턴에 전략패턴을 묶은 코드입니다. 기본적으로 위해서 설명한 퍼사드 동작을 Main_Robot 이 묶어서 실행을 해주는 것이 퍼사드패턴인데, 여기서 this.making = new Making(); 전략패턴을 불러오는 코드를 추가하여 전략패턴 또한 같이 동작할 수 있게 패턴 간의 결합을 만들어서 사용하였습니다.

```c
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
```

> 5. 마지막으로 위에서 작성한 코드를 출력해 주는 부분입니다.

```c
  const myIceCream = IceCream.factory("corn", myBase, myFlavor, myTopping);
    console.log("메뉴표:",myIceCream);
    console.log("----------------------------------------------");
  
  const Ice_order = new Main_Robot();
  Ice_order.Add_icecream();
```

<br/> 

### 전체코드에 대한 출력화면 ↓
![](https://velog.velcdn.com/images/sungwbs/post/6285cbdb-f5c1-4554-a1a6-73c95a87e515/image.png)

### 클래스 다이어그램 ↓
![](https://velog.velcdn.com/images/sungwbs/post/ff92ab96-0075-42ca-b137-901719c1528a/image.png)

**▶ 느낀점**
2인 1팀으로 구성하여 주제 선정부터 사용 할 디자인 패턴을 정하여 시작하게 된 팀 프로젝트였다. 프론트엔드를 사용하는 것이 아닌 디자인패턴을 사용하여서 프로젝트의 전반적인 부분이 주제 내용과 잘 이루어 만드는 것에 중점을 두고 만들었습니다. 일반적으로 클래스를 만들고 매서드를 만들어서 매개변수를 불러오는 코드와 다르게 디자인패턴을 사용하여 코드를 만들어보니, 더 수월하게 코드를 재사용 할 수 있었으며, 추후에 기능을 새로 추가하는 부분에 시간적으로 효율성을 가질 수 있었으며, 팀원에게도 이해시키기 쉽다는 장점을 가졌습니다. 
단, 단점으로는 여러 디자인 패턴을 많이 사용하여 코드를 만들게 되면, 복잡해진다. 크게 재사용성을 바라지 않는 부분이나 간단하게 구현 가능 한 부분에서는 디자인패턴을 굳이 사용 할 필요성을 느끼지 못 했다. 오히려 패턴을 이해하려고 더 힘들어진다.
