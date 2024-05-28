import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ServicesListTable from "./components/ServicesListTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

function filterObjects(array, filterObject) {
  return array.filter((obj) => {
    // Verifica si todos los pares clave-valor en filterObject coinciden en el objeto actual
    return Object.entries(filterObject).every(([key, value]) => {
      // Si el valor es null, undefined o una cadena vacía, no se filtra por esa clave
      if (value === null || value === undefined || value === "") {
        return true;
      }
      // Si la clave es 'fechaHasta', no la procesamos aquí, se manejará por fuera
      if (key === "fechaHasta") {
        return true;
      }
      // Si la clave no está presente en el objeto actual, retorna false
      if (!obj.hasOwnProperty(key)) {
        return false;
      }
      // Si la clave es 'fechaHoraAccion', comparamos si está dentro del rango de fechas
      if (key === "fechaHoraAccion") {
        const fechaInicio = new Date(obj.fechaHoraAccion.split(" ")[0]); // Convertimos a objeto Date y quitamos la hora
        const fechaFin = new Date(filterObject.fechaHasta);
        // Establecemos la hora, minuto, segundo y milisegundo a cero para la fecha de fin
        fechaInicio.setDate(fechaInicio.getDate() + 2);
        fechaFin.setHours(0, 0, 0, 0);
        // Filtramos los objetos cuya fechaHoraAccion esté entre fechaInicio y fechaFin
        console.log({ fechaInicio, fechaFin });
        return fechaInicio >= fechaInicio && fechaInicio <= fechaFin;
      }
      // Si el valor en el objeto incluye el valor del filtro (ignorando mayúsculas y minúsculas)
      return obj[key]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    });
  });
}

const ServicesList = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["allServices"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/services/get-all-services`
      ),
  });
  const [filterDateColumn, setFilterDateColumn] = useState(data?.data);
  const [filtering, setFiltering] = useState("");
  console.log(data?.data);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filterTableInfo = {
      fechaHoraAccion: e?.target?.fromDate?.value,
      fechaHasta: e?.target?.toDate?.value,
      estado: e?.target?.estado?.value,
      numeroServicio: e?.target?.serviceNumber?.value,
    };

    console.log(filterTableInfo);

    const objetosFiltrados = filterObjects(data?.data, filterTableInfo);
    console.log(objetosFiltrados);
  };

  return (
    <Box component="section">
      <Container maxWidth={`lg`}>
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "1.4rem",
            marginBottom: "2rem",
          }}
          variant="h4"
        >
          Lista De Servicios
        </Typography>

        <Box
          onSubmit={handleSubmit}
          component={"form"}
          sx={{ marginBottom: "2.5rem" }}
        >
          <Box sx={{ display: "flex", alignItems: "end", gap: "1rem" }}>
            <Box sx={{ flex: "1" }}>
              <FormControl focused fullWidth>
                <InputLabel focused id="demo-simple-select-label">
                  ESTADO
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="ESTADO"
                  name="estado"
                >
                  <MenuItem value={"pendiente"}>Pendientes</MenuItem>
                  <MenuItem value={"recibidos"}>Recibidos</MenuItem>
                  <MenuItem value={"derivados"}>Derivados</MenuItem>
                  <MenuItem value={"rechazados"}>Rechazados</MenuItem>
                  <MenuItem value={"atentidos"}>Atendidos</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "1rem" }}
              >
                <SearchOutlinedIcon fontSize="small" /> Buscar
              </Button>
            </Box>

            <Box sx={{ flex: "1" }}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  marginBottom: ".4rem",
                }}
                variant="body2"
              >
                Buscar por número de servicio:
              </Typography>
              <TextField
                id="filled-basic"
                type="text"
                label="Buscar..."
                variant="filled"
                name="serviceNumber"
                sx={{ width: "100%" }}
              />

              <Box sx={{ display: "flex", gap: ".7rem", marginTop: "1rem" }}>
                <Box sx={{ flex: "1" }}>
                  <TextField
                    id="filled-basic"
                    sx={{ width: "100%" }}
                    type="date"
                    label="DESDE"
                    size="small"
                    focused
                    name="fromDate"
                  />
                </Box>

                <Box sx={{ flex: "1" }}>
                  {" "}
                  <TextField
                    id="filled-basic"
                    sx={{ width: "100%" }}
                    type="date"
                    label="AL"
                    size="small"
                    focused
                    name="toDate"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <ServicesListTable
          services={filterDateColumn || data?.data}
          setFiltering={setFiltering}
          filtering={filtering}
        />
      </Container>
    </Box>
  );
};

export default ServicesList;

