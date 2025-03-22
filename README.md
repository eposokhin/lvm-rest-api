
# LVM REST API

A simple REST API for interacting with LVM (Logical Volume Manager) on Linux systems.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eposokhin/lvm-rest-api
   cd lvm-rest-api
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the server:

   ```bash
   npm run start
   ```

## Usage Examples

### List Physical Drives

```bash
curl -X GET localhost:3000/api/drive
```

**Response:**

```json
[{"name":"sda"},{"name":"sdb"}]
```

### Create Volume Group

```bash
curl -X POST localhost:3000/api/vg \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My volume group",
    "drives": ["sda"]
  }'
```

### List Volume Groups

```bash
curl -X GET localhost:3000/api/vg
```

**Response:**

```json
[{"name":"My volume group"}]
```

### Create Logical Volume

```bash
curl -X POST localhost:3000/api/volume \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My logical volume",
    "vg_id": "My volume group",
    "size": 84567893
  }'
```

### List Logical Volumes

```bash
curl -X GET localhost:3000/api/volume
```

**Response:**

```json
[{
  "name": "My logical volume",
  "vg_id": "My volume group",
  "size": 84567893
}]
```

## Notes

- Ensure you have appropriate permissions to manage LVM (might require sudo privileges)
- Size parameter should be specified in bytes
- Always verify your LVM configuration before making production changes

---

> **Warning**  
> This API provides direct access to LVM operations. Use with caution in production environments and ensure proper authentication/authorization is implemented.
