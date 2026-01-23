# Subnet Calculator

A visual tool for planning IP address allocation by dividing and joining subnets.

## Features

- **Visual subnet division**: Click "Divide" to split any subnet in half
- **Subnet joining**: Merge adjacent equal-sized subnets back together
- **Flexible column display**: Toggle visibility of subnet, netmask, range, useable IPs, and host count
- **Shareable URLs**: Share your subnet configuration via URL
- **Persistent state**: Your last configuration is saved in localStorage

## How to Use

1. Enter a network address (e.g., `10.0.0.0`) and CIDR prefix (e.g., `16`)
2. Click "Update" to set the base network
3. Click "Divide" on any row to split that subnet into two smaller subnets
4. Click "Join" (arrows) to merge two adjacent same-sized subnets
5. Use "Share URL" to copy a link to your current configuration

## Technical Details

- Supports prefixes from /8 to /30
- Automatically normalizes IP addresses to valid network addresses
- Calculates useable host range (excluding network and broadcast addresses)
- Validates subnet pairs before allowing joins

## Column Descriptions

| Column | Description |
|--------|-------------|
| Subnet | Network address with CIDR notation |
| Netmask | Subnet mask in dotted decimal format |
| Range | Full address range (network to broadcast) |
| Useable IPs | First and last useable host addresses |
| Hosts | Number of useable host addresses |
