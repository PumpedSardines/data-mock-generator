


collection({
  amount: [500, 700],
  quries: [
    { role: "admin" }
  ],
  template: (rand) => {
    const premium = !!rand.int(0, 1);

    const ret = {
      name: firstName(),
      email: email(),
      role: oneOf([
        value("user"),
        value("kommun"),
        value("admin"),
      ]),
      password: string({ length: [7, 12] }),
      saved: array({
        length: [3, 10],
        item: string({ length: 6 })
      })
    }

    if(premium) {
      ret.premium = value(true);
      ret.renewPremium = oneOf([
        value(true),
        value(false),
      ]);
    } else {
      ret.premium = value(false);
      ret.renewPremium = value(false);
    }

  }
}).push("mongo");

