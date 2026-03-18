# C++ 封装、继承、多态温习教程

## 目录

1. [一、面向对象三大特性概览](#wk2-oop-overview)
2. [二、封装（Encapsulation）](#wk2-encapsulation)
3. [三、继承（Inheritance）](#wk2-inheritance)
4. [四、多态（Polymorphism）](#wk2-polymorphism)

### 二、封装（Encapsulation）

1. [什么是封装](#wk2-encapsulation-1)
2. [封装的意义](#wk2-encapsulation-2)
3. [C++ 中的访问权限](#wk2-encapsulation-3)
4. [封装示例](#wk2-encapsulation-4)
5. [封装示例分析](#wk2-encapsulation-5)

### 三、继承（Inheritance）

1. [什么是继承](#wk2-inheritance-1)
2. [继承的意义](#wk2-inheritance-2)
3. [继承的示例](#wk2-inheritance-3)
4. [继承示例分析](#wk2-inheritance-4)
5. [继承中的访问权限](#wk2-inheritance-5)
6. [`protected` 的作用](#wk2-inheritance-6)
7. [继承中的构造函数与析构函数](#wk2-inheritance-7)

### 四、多态（Polymorphism）

1. [什么是多态](#wk2-polymorphism-1)
2. [多态的分类](#wk2-polymorphism-2)
3. [为什么需要多态](#wk2-polymorphism-3)
4. [多态示例](#wk2-polymorphism-4)

<a id="wk2-oop-overview"></a>
## 一、面向对象三大特性概览

C++ 作为一门支持面向对象编程的语言，其中最核心的三个概念就是：

- **封装（Encapsulation）**
- **继承（Inheritance）**
- **多态（Polymorphism）**

这三者共同构成了面向对象编程的基础。

可以先用一句话理解：

- **封装**：把数据和操作数据的函数放在一起，并隐藏内部细节
- **继承**：让新类获得已有类的属性和行为
- **多态**：同样的调用方式，表现出不同的行为

---

<a id="wk2-encapsulation"></a>
## 二、封装（Encapsulation）

<a id="wk2-encapsulation-1"></a>
### 1. 什么是封装

封装指的是：

> 将数据（成员变量）和操作数据的方法（成员函数）放在同一个类中，并通过访问权限控制对外暴露的内容。

也就是说：

- 类的内部细节不随便暴露给外部
- 外部只能通过规定好的接口来访问对象

这就像一个“黑盒子”：

- 你知道怎么用
- 但不一定知道它内部是怎么实现的

---

<a id="wk2-encapsulation-2"></a>
### 2. 封装的意义

封装的主要作用有：

- **保护数据**，防止外部随意修改
- **隐藏实现细节**
- **降低耦合**
- **提高可维护性**

例如，一个学生类的年龄如果允许外部随便改，就可能出现负数年龄、不合理年龄等问题。  
如果通过函数统一控制，就可以提前检查数据是否合法。

---

<a id="wk2-encapsulation-3"></a>
### 3. C++ 中的访问权限

C++ 中类的成员有三种访问权限：

* public

公有成员，类内类外都可以访问。

* private

私有成员，只能在类的内部访问，类外不能直接访问。

* protected

受保护成员，类外不能访问，但子类可以访问。

---

<a id="wk2-encapsulation-4"></a>
### 4. 封装示例

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int age;

public:
    void setName(string n) {
        name = n;
    }

    void setAge(int a) {
        if (a >= 0 && a <= 150) {
            age = a;
        } else {
            cout << "年龄不合法！" << endl;
        }
    }

    string getName() {
        return name;
    }

    int getAge() {
        return age;
    }

    void showInfo() {
        cout << "姓名：" << name << "，年龄：" << age << endl;
    }
};

int main() {
    Student s;
    s.setName("Alice");
    s.setAge(18);
    s.showInfo();

    return 0;
}
```
<a id="wk2-encapsulation-5"></a>
### 5. 封装示例分析

上面的代码体现了封装：

- `name` 和 `age` 被定义为 `private`
- 外部不能直接写：

```cpp
s.age = -10;
```

只能通过 setAge() 进行修改

类内部可以决定哪些值是合法的


<a id="wk2-inheritance"></a>
# 三、继承（Inheritance）

<a id="wk2-inheritance-1"></a>
### 1. 什么是继承

继承指的是：

> 让一个新类在已有类的基础上进行扩展，复用原有类的成员。

已有类通常叫：

- **父类**
- **基类**

新类通常叫：

- **子类**
- **派生类**

---

<a id="wk2-inheritance-2"></a>
### 2. 继承的意义

继承的主要作用：

- **代码复用**
- **减少重复**
- **建立类之间的层次关系**
- **便于扩展**

例如：

- 动物都有“吃饭”“睡觉”的行为
- 狗、猫、鸟都属于动物
- 那么这些公共部分就可以写在 `Animal` 类中
- `Dog`、`Cat` 再去继承它

---

<a id="wk2-inheritance-3"></a>
### 3. 继承的示例

```cpp
class 父类 {
    // ...
};

class 子类 : 继承方式 父类 {
    // ...
};
```
例如：
```C++
#include <iostream>
#include <string>
using namespace std;

class Animal {
public:
    string name;

    void eat() {
        cout << name << " 正在吃东西" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << name << " 正在汪汪叫" << endl;
    }
};

int main() {
    Dog d;
    d.name = "小黄";
    d.eat();
    d.bark();

    return 0;
}
```

<a id="wk2-inheritance-4"></a>
### 4. 继承示例分析

在这个例子中：

- `Dog` 继承了 `Animal`
- 所以 `Dog` 自动拥有了父类中的 `name` 和 `eat()`
- 同时 `Dog` 自己又新增了 `bark()` 函数

也就是说：

> 子类 = 父类已有内容 + 子类新增内容

这就是继承最核心的作用：**复用已有代码，并在此基础上继续扩展。**

---

<a id="wk2-inheritance-5"></a>
### 5. 继承中的访问权限

父类成员本身有三种权限：

- `public`
- `protected`
- `private`

而继承方式也有三种：

- `public` 继承
- `protected` 继承
- `private` 继承

在学习阶段，最重要的是掌握 `public` 继承。

### `public` 继承下的权限变化

| 父类成员权限 | 子类中的访问权限 |
|--------------|------------------|
| `public`     | `public`         |
| `protected`  | `protected`      |
| `private`    | 不可直接访问     |

注意：

> 父类的 `private` 成员虽然会被继承到子类对象中，但子类不能直接访问。

---

<a id="wk2-inheritance-6"></a>
### 6. `protected` 的作用

`protected` 表示：

> 类外不能访问，但子类可以访问。

示例：

```cpp
#include <iostream>
using namespace std;

class Animal {
protected:
    int age;

public:
    void setAge(int a) {
        age = a;
    }
};

class Dog : public Animal {
public:
    void showAge() {
        cout << "年龄：" << age << endl;
    }
};

int main() {
    Dog d;
    d.setAge(3);
    d.showAge();

    return 0;
}
```
这里：

- `age` 不是公有的，所以外部不能直接写
- 但 `Dog` 作为子类，可以访问 `age`

---

<a id="wk2-inheritance-7"></a>
### 7. 继承中的构造函数与析构函数

当创建子类对象时：

- 先调用父类构造函数
- 再调用子类构造函数

当销毁子类对象时：

- 先调用子类析构函数
- 再调用父类析构函数

示例：

```cpp
#include <iostream>
using namespace std;

class Base {
public:
    Base() {
        cout << "Base 构造函数" << endl;
    }

    ~Base() {
        cout << "Base 析构函数" << endl;
    }
};

class Derived : public Base {
public:
    Derived() {
        cout << "Derived 构造函数" << endl;
    }

    ~Derived() {
        cout << "Derived 析构函数" << endl;
    }
};

int main() {
    Derived d;
    return 0;
}
```

输出结果：
```text
Base 构造函数
Derived 构造函数
Derived 析构函数
Base 析构函数
```


<a id="wk2-polymorphism"></a>
# 四、多态（Polymorphism）

<a id="wk2-polymorphism-1"></a>
### 1. 什么是多态

多态指的是：

> 同一种调用方式，在不同对象上会表现出不同的行为。

例如：

- 同样调用“说话”函数
- 狗会输出“汪汪汪”
- 猫会输出“喵喵喵”

虽然调用形式一样，但运行结果不同，这就是多态。

---

<a id="wk2-polymorphism-2"></a>
### 2. 多态的分类

C++ 中的多态一般分为两类：

* （1）静态多态

也叫编译时多态，常见形式有：

- 函数重载
- 运算符重载
- 模板

* （2）动态多态

也叫运行时多态，主要依赖：

- 继承
- 虚函数
- 父类指针或引用指向子类对象

面向对象三大特性里说的“多态”，通常重点指的是：

> 动态多态

---

<a id="wk2-polymorphism-3"></a>
### 3. 为什么需要多态

多态的意义在于：

- 统一接口
- 提高程序扩展性
- 降低代码耦合
- 让程序更灵活

例如，若有很多动物对象：

- 狗
- 猫
- 鸟

如果没有多态，可能需要分别调用各自的方法。  
有了多态后，可以统一按“动物”来处理，而具体行为由运行时决定。

<a id="wk2-polymorphism-4"></a>
### 4. 多态示例
```C++
#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() {
        cout << "动物在说话" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "小狗：汪汪汪" << endl;
    }
};

class Cat : public Animal {
public:
    void speak() override {
        cout << "小猫：喵喵喵" << endl;
    }
};

int main() {
    Animal* a1 = new Dog();
    Animal* a2 = new Cat();

    a1->speak();
    a2->speak();

    delete a1;
    delete a2;

    return 0;
}
```
