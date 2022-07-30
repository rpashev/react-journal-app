import { BasicJournal } from "../../pages/JournalsList/JournalsList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import img from "../../assets/journal.jpg";
import { useNavigate } from "react-router-dom";

interface Props {
  journal: BasicJournal;
}

const JournalCard = ({ journal }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 310 }}
      onClick={() => navigate(`/journals/${journal.id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt=""
          sx={{
            clipPath: "polygon(0 0, 100% 0, 100% 84%, 0 100%)",
            height: "13rem",
          }}
        />
        <CardContent>
          <Typography
            variant="h4"
            color="white"
            marginBottom="2rem"
            sx={{
              textAlign: "right",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "300",
              position: "absolute",
              top: "7rem",
              right: "2rem",
              fontSize: "1.6rem",
              lineHeight: "1.6",
              width: "70%",
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(rgba(186, 104, 200, 0.9), rgba(171, 71, 188, 0.9))",
                padding: "0.4rem 0.6rem",
                boxDecorationBreak: "clone",
              }}
              component="span"
            >
              {journal.journalName}
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            You have&nbsp;
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {journal.entriesAmount}
            </Box>{" "}
            entries in this journal.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default JournalCard;
