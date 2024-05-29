bytes = [ "00000020", "0804b160", "0804853d", "00000009",
          "bffffcce", "b7e1c4a9", "bffffba4", "b7fc4000",
          "b7fc4000", "0804b160", "39617044", "28293664",
          "6d617045", "bf000a64", "0804861b", "00000002",
          "bffffba4", "bffffbb0", "119eaa00", "bffffb10",
          "00000000", "00000000", "b7e04e81", "b7fc4000",
          "b7fc4000", "00000000", "b7e04e81", "00000002",
          "bffffba4", "bffffbb0", "bffffb34", "00000001" ]

bytes2 = []

for y in bytes:
    little_endian = y[6:] + y[4:-2] + y[2:-4] + y[0:-6]
    bytes2.append(little_endian)
   

for x in bytes2:
    print x.decode("hex")
