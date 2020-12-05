/*
FROM API
{
        "id": "f8016f8e3897cbd129ec0fde",
        "type": "shirts",
        "name": "NYXBE BRIGHT METROPOLIS",
        "color": [
            "yellow"
        ],
        "price": 44,
        "manufacturer": "derp"
    },
*/

enum itemType {
  Jackets ='jackets',
  Shirts = 'shirts',
  Accessories = 'accessories'
}

export interface Item {
  id: string;
  type: itemType;
  name: string;
  color: string;
  price: number;
  manufacturer: string;
}