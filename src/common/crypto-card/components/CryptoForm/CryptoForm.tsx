import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { cn } from "../../../../utils/cn";
import {
  updateBalance,
  type CryptoToken,
} from "../../../../features/crypto/cryptoSlice";
import { useAppDispatch } from "../../../../app/hooks";

type CryptoFormProps = {
  slide: CryptoToken;
};

const CryptoForm = ({ slide }: CryptoFormProps) => {
  const [amount, setAmount] = useState("");
  const [unitName, setUnitName] = useState("");
  const [comment, setComment] = useState("");

  const [amountError, setAmountError] = useState("");
  const [unitNameError, setUnitNameError] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const unitMultiplier =
      slide.units.find((u) => u.unitName === unitName)?.unit ?? 1;

    dispatch(
      updateBalance({
        short: slide.short,
        balance: Number(amount) * unitMultiplier,
      })
    );
  };

  const validate = () => {
    let hasError = false;

    if (!amount) {
      setAmountError("The amount must be greater than 0");
      hasError = true;
    } else {
      setAmountError("");
    }

    if (!unitName) {
      setUnitNameError("You have to select the unit");
      hasError = true;
    } else {
      setUnitNameError("");
    }

    return !hasError;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4 w-full px-2", "lg:px-14")}
    >
      <div>
        <Typography fontWeight="bold" className="mb-1">
          Amount:
        </Typography>
        <TextField
          error={!!amountError}
          helperText={amountError}
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: 0, style: { color: "white" } }}
          className="bg-[#545454] rounded"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: {
              color: "white",
            },
            "& .MuiFormHelperText-root": {
              backgroundColor: "#332e2e",
              margin: 0,
            },
          }}
        />
      </div>

      <div>
        <Typography fontWeight="bold" className="mb-1">
          Unit:
        </Typography>
        <TextField
          error={!!unitNameError}
          helperText={unitNameError}
          select
          fullWidth
          variant="outlined"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          className="bg-[#545454] rounded"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: {
              color: "white",
            },
            "& .MuiFormHelperText-root": {
              backgroundColor: "#332e2e",
              margin: 0,
            },
          }}
        >
          {slide.units.map((u) => (
            <MenuItem value={u.unitName}>{u.unitName}</MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <Typography fontWeight="bold" className="mb-1">
          Comment:
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          InputProps={{ style: { color: "white" } }}
          className="bg-[#545454] rounded"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: {
              color: "white",
            },
          }}
        />
      </div>

      <div className={cn("flex justify-center", "md:justify-end")}>
        <Button type="submit" color="success" variant="contained" className="">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CryptoForm;
