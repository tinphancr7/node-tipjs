// Redis has 3 data type in string:
// 1.embstring (<=44byte)
// 2.raw (>44 byte)
// 3.int
// Some popular command:
// set key value
// get key
// exists key : check key exist or not
// del key : delete key
// strlen key : get length of key
// mset key1 value1 key2 value2 : set multiple key value
// mget key1 key2 : get multiple key value
// incr key : increase value of key
// decr key : decrease value of key
// incrby key value : increase value of key by value
// decrby key value : decrease value of key by value
// keys pattern : get all key match pattern ( keys "0001:*")
// expire key time : set expire time for key
// ttl key : get time to live of key
// Object encoding key : check data type
// set key value EX 10 : set expire time for key
// setnx key value : set key value if key not exist
// set key value nx px 10 :  set key value if key not exist and set expire time for key

// hash redis

// hset key field value : set field value for key
// hget key field : get field value of key
// hgetall key : get all field value of key
// hdel key field : delete field of key
// hexists key field : check field exist or not
// hkeys key : get all field of key
// hlen key : get number of field of key
// hmget key field1 field2 : get multiple field value of key
// hmset key field1 value1 field2 value2 : set multiple field value of key
// hsetnx key field value : set field value if field not exist
// hvals key : get all value of key
// hincrby key field value : increase value of field by value
// hincrbyfloat key field value : increase value of field by value
// hstrlen key field : get length of field value

// list redis:
// lpush key value : push value to head of list
// rpush key value : push value to tail of list
// lrange key start stop : get value from start to stop of list
// lpop key : pop value from head of list
// rpop key : pop value from tail of list
// blpop key : pop value from head of list and block if list empty
// brpop key : pop value from tail of list and block if list empty
// lindex key index : get value at index of list
// llen key : get length of list
// lrem key count value : remove value from list
// lset key index value : set value at index of list
// ltrim key start stop : trim list from start to stop
// rpoplpush source destination : pop value from source and push to destination

// set redis : Dùng để phát triển chức năng like, tìm bạn chung như facebook và các lệnh phổ biến
// sadd key value : add value to set
// smembers key : get all value of set
// srem key value : remove value from set
// sismember key value : check value exist or not
// scard key : get number of value of set
// spop key : pop value from set
// srandmember key count : get random value from set
// srem key value : remove value from set
// sisemember key value : check value exist or not
// smove source destination value : move value from source to destination
// sinter key1 key2 : get intersection of set
// sinterstore destination key1 key2 : store intersection of set
// sdiff key1 key2 : get difference of set

// zset redis:Các lệnh phổ biến sử dụng tổng hợp sản phẩm bán chạy, lượt xem và theo dõi

// zadd key score value : add value to zset with score
// zrange key start stop : get value from start to stop of zset
// zrangebyscore key min max : get value from min to max of zset
// zrem key value : remove value from zset
// zcard key : get number of value of zset
// zcount key min max : get number of value from min to max of zset
// zincrby key increment value : increase score of value by increment
// zrank key value : get rank of value in zset
// zrevrank key value : get reverse rank of value in zset
// zscore key value : get score of value in zset

// transaction redis
// multi : start transaction
// exec : execute transaction
// discard : cancel transaction
// watch key : watch key
// unwatch : unwatch key
// set key value : set value for key
