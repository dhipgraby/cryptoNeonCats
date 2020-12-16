
var colors = {
10: "ffcc80",
11: "3f1174",
12: "b22a90",
13: "fff3e0",
14: "4c858b",
15: "18bebe",
16: "b5044b",
17: "d6b1d4",
18: "fecb40",
19: "748882",
20: "4a3c95",
21: "482916",
22: "267bf0",
23: "5af7e2",
24: "adeacc",
25: "cf2b03",
26: "b3c459",
27: "353f9",
28: "5d4993",
29: "ba8d15",
30: "da2457",
31: "ff17fe",
32: "d6e81d",
33: "daf2db",
34: "19b510",
35: "18e26f",
36: "b7c36a",
37: "8cb175",
38: "bdce32",
39: "f2e0ba",
40: "a2f8a5",
41: "64bf50",
42: "f1a771",
43: "4982a9",
44: "f66c41",
45: "2fe802",
46: "bda142",
47: "8342ff",
48: "2b4ab4",
49: "ad4595",
50: "bae4f",
51: "b76d01",
52: "8e8207",
53: "285b9f",
54: "c4422a",
55: "f1eaa7",
56: "e3a0cc",
57: "65c116",
58: "656ccf",
59: "7c25f4",
60: "1e18d1",
61: "688a7d",
62: "1fe786",
63: "425716",
64: "4ac043",
65: "547836",
66: "24a216",
67: "fd9bba",
68: "24894d",
69: "c54b03",
70: "6fbdce",
71: "cff1dd",
72: "8805fb",
73: "fe99d2",
74: "c52f14",
75: "e31c54",
76: "d010eb",
77: "b83436",
78: "c294b6",
79: "564a6c",
80: "531bcf",
81: "c04b8c",
82: "3cd2ef",
83: "82286c",
84: "aa2639",
85: "86be6c",
86: "e62102",
87: "5471fc",
88: "5c089",
89: "703c75",
90: "9a8e8f",
91: "8b9307",
92: "fcbc82",
93: "ea5978",
94: "b8e370",
95: "43474b",
96: "262d2b",
97: "ddd67e",
98: "344867"}

function allColors(){

return colors;

}

var gradients = {
// green (default) -> normalEyes
0: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(57, 255, 20))",
    right:"linear-gradient(to bottom left, rgb(57, 255, 20), rgb(41, 41, 40))"
    },
// orange, eyesType1
1: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(255, 191, 0))",
    right: "linear-gradient(to bottom left, rgb(255, 191, 0), rgb(41, 41, 40))"
    },
// blue, eyesType2
2: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(84, 255, 249))",
    right: "linear-gradient(to bottom left, rgb(84, 255, 249), rgb(41, 41, 40))"
    },
//yellow rgb(252, 252, 141)
3: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(252, 240, 3))",
   right: "linear-gradient(to bottom left, rgb(252, 240, 3), rgb(41, 41, 40))"
    },
//red rgb(255, 117, 119)
4: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(255, 117, 119))",
    right: "linear-gradient(to bottom left, rgb(255, 117, 119), rgb(41, 41, 40))"
    },
//black rgb(2, 0, 0)
5: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(2, 0, 0))",
    right: "linear-gradient(to bottom left, rgb(2, 0, 0), rgb(41, 41, 40))"
    },
//grey rgb(130, 130, 130)
6: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(130, 130, 130))",
    right: "linear-gradient(to bottom left, rgb(130, 130, 130), rgb(41, 41, 40))"
    },
//pink rgb(255, 23, 254)
7: {left: "linear-gradient(to bottom left, rgb(41, 41, 40), rgb(255, 23, 254))",
    right: "linear-gradient(to bottom left, rgb(255, 23, 254), rgb(41, 41, 40))"
    }
}

var dVariations = {
    
    //normaldecoration
    0: {dots: {'transform': 'rotate(0deg)', 'height': '80px', 'width': '6px', 'top': '1px', 'border-radius': '50% 50% 50% 50%'},
        dots_first: {'transform': 'rotate(0deg)', 'height': '60px', 'width': '5px', 'top': '3px', 'left': '-20px', 'border-radius': '50% 50% 50% 50%'},
        dots_second: {'transform': 'rotate(0deg)', 'height': '60px', 'width': '5px', 'top': '3px', 'left': '20px', 'border-radius': '50% 50% 50% 50%'}
        },
    // spread - decoVar1
    1: {dots: {'top': '1px','width': '8px', 'height': '80x', 'left': '108px', 'border-radius': '50% 50% 50% 50%'},
        dots_first: {'top': '-10px', 'width': '8px', 'height': '87px', 'left': '-38px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(45deg)'},
        dots_second: {'top': '-10px', 'width': '8px', 'height': '87px', 'left': '41px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(-45deg)'}
        },
    //long mid - decoVar2
    2: {dots: {'height': '95px', 'width': '11px', 'border-radius': '50% 50% 50% 50%'},
        dots_first: {'top': '-3px', 'width': '8px', 'height': '38px', 'left': '-21px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(45deg)'},
        dots_second: {'top': '-3px', 'width': '8px', 'height': '38px', 'left': '24px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(-45deg)'}
        },
    //spread narrow - decoVar3
    3: {dots: {'height': '101px', 'width': '8px', 'border-radius': '50% 50% 50% 50%'},
        dots_first: {'top': '-2px', 'width': '8px', 'height': '92px', 'left': '-22px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(20deg)'},
        dots_second: {'top': '-2px', 'width': '8px', 'height': '92px', 'left': '23px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(-20deg)'}
        }
    
}