# 如何找到字符串中的子串

可以先看一下介绍文章

[oiwiki的字符串匹配](https://oi-wiki.org/string/match/)


给一个母串s和一个子串sub，找到子串在母串中的出现次数

### 暴力破解

```C++
#include <iostream>
#include <string>
using namespace std;

int countSubstring(const string& s, const string& sub) {
    if (sub.empty() || s.size() < sub.size()) return 0;

    int count = 0;
    for (size_t i = 0; i + sub.size() <= s.size(); ++i) {
        if (s.substr(i, sub.size()) == sub) {
            ++count;
        }
    }
    return count;
}

int main() {
    string s, sub;
    cin >> s >> sub;
    cout << countSubstring(s, sub) << endl;
    return 0;
}
```

母串当前位置往后sub.size()个位置，看看是否为字串，如果是的话就count++ 


### 双层循环写法

效率似乎比substr快那么一丢丢

```C++
#include <iostream>
#include <string>
using namespace std;

int countSubstring(const string& s, const string& sub) {
    if (sub.empty() || s.size() < sub.size()) return 0;

    int count = 0;
    for (size_t i = 0; i + sub.size() <= s.size(); ++i) {
        bool match = true;
        for (size_t j = 0; j < sub.size(); ++j) {
            if (s[i + j] != sub[j]) {
                match = false;
                break;
            }
        }
        if (match) ++count;
    }
    return count;
}
```

其实有更快地算法，我们发现这个量级基本都是o(m * n)级别的，此时kmp算法的三位大佬发力。


有关kmp的教程： 

第一篇文章感觉优势在于图解上,2013年5月但是有点老了，但是确实很清晰

[kmp](https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

第二个是视频，优势在于动画，但是对于没学过python的可以只听原理，不用细看代码

[奇乐编程kmp](https://www.bilibili.com/video/BV1AY4y157yL/?spm_id_from=333.337.search-card.all.click&vd_source=9e7107b0cdbb49c22f53dc3231f6e7b6)


这里附上学长当时写的模版,其实现在不怎么会写了，kmp的写法有很多，理解方式也有很多，从0开始和从1开始这个模版甚至都不一样。下面写的是找到匹配字符串每个开始位置的。

```C++
#include<iostream>
using namespace std;
const int N = 1e6 + 10; 
char s[N] , p[N] ; 
int n , m ; 
int ne[N] ; 
int main()
{
    cin >> n  >> s >> m >> p  ;  // s为子串， p为母串
    // 找next数组
    for(int i = 1 , j = 0 ; i < n; i ++ )
    {
        while( j && s[i] != s[j] ) j = ne[j -1 ] ; 
        if(s[i] == s[j] )  j ++ ; 
        ne[i]=  j  ;
    }
    for(int i = 0 , j = 0 ; i < m; i ++ )
    {
        while( j && s[j] != p[i] ) j = ne[j-1] ; 
        if(s[j] == p[i] )  j ++ ; 
        if( j == n)
        {
            cout << i - j + 1  << " " ;
            j = ne[j- 1];
        }
    }
    return 0 ;
}
```

字符串匹配这部分其实不是学长的擅长点，当然还有其他的匹配算法，比如AC自动机等高级的，本课程暂不涉及。


# 中位数


有关中位数的其实挺多，但是如果遇到
$$
\left|x - x_0\right| + \left|y - y_0\right| + \left|z - z_0\right|
$$

然后求

$$
\sum \left|x_i - x_0\right| + \sum \left|y_i - y_0\right| + \sum \left|z_i - z_0\right|
$$

这样大概率是求中位数

做法： 

分别把所有的 x、y、z 存起来，找x , y , z中位数，分别计算曼哈顿距离，然后求最小值

[曼哈顿距离之和最小](https://blog.csdn.net/nka_kun/article/details/83239539)


# 数组的循环移动

数组实现循环移动有很多种办法:

1. 单开一个新的数组
   
通过开一个数组B，然后通过取模的方式来进行存放，给出移动的位置变化，可以自行推导一下
``` C++
(i + k) % n  // 右移
(i - k + n )% n // 左移动
```

```C++
#include <iostream>
using namespace std;

int main() {
    int a[] = {1, 2, 3, 4, 5};
    int n = 5, k = 2;
    int b[5];

    k %= n;
    for (int i = 0; i < n; i++) {
        b[(i + k) % n] = a[i];
    }

    for (int i = 0; i < n; i++) {
        cout << b[i] << " ";
    }
    return 0;
}
```

2. 原地移动(好像某些企业面试题就喜欢这么让你原地进行一些操作)
   
“原地移动”就是：不借助另一个同样大的数组，直接在原数组上完成循环移动。

数组循环移动最经典的原地做法是三次翻转。

右移： 
```C++
#include <iostream>
#include <algorithm>
using namespace std;

void rotateRight(int a[], int n, int k) {
    k %= n;
    reverse(a, a + n);         // 整体翻转
    reverse(a, a + k);         // 翻转前 k 个
    reverse(a + k, a + n);     // 翻转后 n-k 个
}

int main() {
    int a[] = {1, 2, 3, 4, 5, 6, 7};
    int n = 7;
    int k = 3;

    rotateRight(a, n, k);

    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    return 0;
}
```
左移:
```C++
#include <iostream>
#include <algorithm>
using namespace std;

void rotateLeft(int a[], int n, int k) {
    k %= n;
    reverse(a, a + k);
    reverse(a + k, a + n);
    reverse(a, a + n);
}

int main() {
    int a[] = {1, 2, 3, 4, 5, 6, 7};
    int n = 7;
    int k = 3;

    rotateLeft(a, n, k);

    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    return 0;
}
```


设原数组为：

$$
[a_1, a_2, \dots, a_{n-k}, a_{n-k+1}, \dots, a_n]
$$

把它分成两段：

- 前一段  
  $$
  A = [a_1, a_2, \dots, a_{n-k}]
  $$

- 后一段  
  $$
  B = [a_{n-k+1}, \dots, a_n]
  $$

那么数组右循环移动 k 位后的结果应该是：

$$
[B, A]
$$

也就是：

$$
[a_{n-k+1}, \dots, a_n, a_1, \dots, a_{n-k}]
$$

---

## 三次翻转算法

对原数组[A, B] 做三步：

1. 整体翻转

$$
[A, B] \to [B^R, A^R]
$$

2. 翻转前 k 个元素

$$
[B^R, A^R] \to [B, A^R]
$$

3. 翻转后 n-k 个元素

$$
[B, A^R] \to [B, A]
$$

最后正好得到右移 k 位后的结果。左移动同理


3. rotate函数
   
> 当你觉得太麻烦的时候，不如看看C++库里

* rotate(first, middle, last);
  
把区间 [first, last) 重新排列，使 middle 成为新区间的第一个位置。也就是：

[first, middle) + [middle, last) => [first, middle) + [middle, last)

左移代码如下:

```C++
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a[] = {1, 2, 3, 4, 5};
    int n = 5, k = 2;

    rotate(a, a + k, a + n);

    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    return 0;
}
```

右移 k 位，等价于左移 n-k 位：可以自行尝试