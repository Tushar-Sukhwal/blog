---
title: IPv4 vs IPv6 - A Deep Dive
description: Understanding the evolution of IP addressing, from IPv4 to IPv6, with real-world usage, technical concepts, and code examples.
slug: ipv4-vs-ipv6
date: 09/04/2025
author: Tushar
image: https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
---

# IPv4 vs IPv6: Which is Better?

The Internet as we know it runs on **IP addresses**, which uniquely identify devices online. For decades, **IPv4** served this purpose. But with billions of devices online today, IPv4’s limitations have led to the rise of **IPv6**. This blog explains the differences, transition strategies, technical concepts like subnet masking and IP address classes, and even offers some coding examples.

---

## What is IPv4?

IPv4 (Internet Protocol version 4) uses **32-bit** addresses, usually written in dot-decimal notation like `192.168.1.1`.

- Maximum addresses: **2³² = ~4.3 billion**
- Format: `X.X.X.X` (e.g., `172.16.254.1`)
- Widely deployed since the early internet days

### Limitations of IPv4

- **Address exhaustion** due to IoT and mobile boom
- Heavy reliance on **NAT (Network Address Translation)**
- Not optimized for security or future growth

---

## What is IPv6?

IPv6 is the next-gen protocol with **128-bit** addresses. It’s written in hexadecimal, e.g., `2001:0db8:85a3::8a2e:0370:7334`.

- Total addresses: **2¹²⁸** (~340 undecillion)
- No need for NAT
- Built-in security (IPSec)
- Simplified headers and routing

---

## IPv4 vs IPv6: Key Differences

![IPv4 vs IPv6: Key Differences](ipv4-ipv6/2.jpg)
---

## Transition Strategies to IPv6

Migrating the entire internet to IPv6 overnight is impossible. Transition happens via:

1. **Dual Stack**: Devices run both IPv4 and IPv6
2. **Tunneling**: Encapsulate IPv6 packets in IPv4
3. **Translation**: Convert packets using NAT64/DNS64
4. **Carrier-Grade NAT (CGNAT)**: Extends IPv4 temporarily

---

## Subnet Masking in IPv4

A **subnet mask** determines how IP addresses are split into networks and hosts.

Example:

- IP: `192.168.1.10`
- Subnet Mask: `255.255.255.0`
- CIDR: `/24` (24 bits for network)

### CIDR Notation

CIDR (Classless Inter-Domain Routing) uses suffixes like `/24` instead of masks.

---

## IP Address Classes in IPv4

IPv4 is divided into classes to simplify address allocation:

![IPv4 is divided into classes to simplify address allocation](ipv4-ipv6/1.jpg)


---

## Subnetting in IPv6

IPv6 doesn’t use subnet masks the way IPv4 does. Instead:

- Subnets typically use `/64` (first 64 bits for network)
- Host ID is the last 64 bits
- Example: `2001:db8:abcd:0012::/64`

---

## Real-World IPv6 Adoption (2025)

### Why IPv6 is Critical

- IPv4 can't handle the scale of modern networks
- IPv6 enables IoT, 5G, and modern internet applications

### Adoption Statistics

Source: [Google IPv6 Statistics](https://www.google.com/intl/en/ipv6/statistics.html)

- 🌍 Global: ~47%
- 🇮🇳 India: >65%
- 🇺🇸 US: ~51%
- 🌐 Leading ISPs and mobile networks have full IPv6 rollout

---

## IPv6 in Code: Examples

### ✅ JavaScript (Node.js) IPv6 Server

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from IPv6 server!');
});

server.listen(3000, '::1', () => {
  console.log('Server listening on http://[::1]:3000');
});
```

### ✅ C++ IPv6 Client (Linux/Unix)

```cpp
#include <iostream>
#include <cstring>
#include <arpa/inet.h>
#include <unistd.h>

int main() {
    int sockfd = socket(AF_INET6, SOCK_STREAM, 0);

    sockaddr_in6 serverAddr {};
    serverAddr.sin6_family = AF_INET6;
    serverAddr.sin6_port = htons(8080);
    inet_pton(AF_INET6, "::1", &serverAddr.sin6_addr);

    if (connect(sockfd, (sockaddr*)&serverAddr, sizeof(serverAddr)) == 0) {
        std::cout << "Connected to IPv6 server!" << std::endl;
    } else {
        perror("Connection failed");
    }

    close(sockfd);
    return 0;
}
```

---

## IPv6 Best Practices

- ✔️ Use **DNS** instead of hardcoding addresses
- ✔️ Prefer **CIDR** (`/64`, `/56`, etc.) over manual subnetting
- ✔️ Ensure firewalls and routers support IPv6
- ✔️ Test using tools like `ping6`, `traceroute6`, etc.
- ✔️ Deploy **dual stack** during migration

---

## Final Thoughts

IPv6 is no longer optional—it’s **essential**. As the world scales up in connected devices, only IPv6 can offer the necessary flexibility, security, and scalability.

> Ready to build the internet of the future? Make sure your stack supports IPv6 today.

