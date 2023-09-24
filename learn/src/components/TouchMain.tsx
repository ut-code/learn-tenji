import React, { useEffect, useState } from "react";
import translateBraille from "@/utils/translateBraille";
import { judge, eightJudge, makeQuestion } from "@/components/QuestionAndJudge";
import EdittableBraille from "@/components/EdittableBraille";
import {
  Paper,
  Typography,
  Divider,
  Button,
  Stack,
  Box,
  Container,
} from "@mui/material";
import { BrailleString } from "@/models/BrailleString";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import * as tenji from "tenji";

export default function TouchMain({
  typeOfQuestions,
  brailleDotCount,
}: {
  typeOfQuestions: string[];
  brailleDotCount: 6 | 8;
}): JSX.Element {
  const [brailleStrings, setBrailleStrings] = useState<BrailleString>(
    new BrailleString(
      "unicode",
      [...Array(10)].map((_) => "⠀").join(""),
      brailleDotCount,
    ),
  );
  const [hiraganaStrings, setHiraganaStrings] = useState<string>("");
  const [question, setQuestion] = useState<string>(typeOfQuestions[0]); // 問題
  const [rightOrWrong, judgeAnswer] = useState<boolean>(false); // 正誤
  const [afterJudgeAnswer, setAfterJudgeAnswer] = useState<boolean>(false); // 正誤

  useEffect(() => {
    setHiraganaStrings(
      brailleDotCount === 6
        ? translateBraille(brailleStrings)
        : tenji.fromTenji(
            brailleStrings.brailleArray
              .map((braille) => braille.unicodeBraille)
              .join(""),
            { kanji: true },
          ),
    );
  }, [brailleDotCount, brailleStrings]);

  useEffect(() => {
    judgeAnswer(
      brailleDotCount === 6
        ? judge(brailleStrings, question)
        : eightJudge(brailleStrings, question),
    );
  }, [brailleDotCount, brailleStrings, question]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          「{question}」を点字に直してください。
        </Typography>
        <Typography>
          {brailleStrings.brailleArray.map((brailleChar, i) => (
            <EdittableBraille
              key={i}
              height="100"
              width="60"
              braille={brailleChar}
              setBraille={(braille) => {
                setBrailleStrings(
                  new BrailleString(
                    "braille array",
                    brailleStrings.brailleArray.map((_, j) =>
                      j === i ? braille : _,
                    ),
                    brailleDotCount,
                  ),
                );
              }}
            />
          ))}
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        {afterJudgeAnswer === true ? (
          rightOrWrong === true ? (
            <Button
              variant="contained"
              onClick={() => {
                setQuestion(makeQuestion(typeOfQuestions));
                setBrailleStrings(
                  new BrailleString(
                    "unicode",
                    [...Array(10)].map((_) => "⠀").join(""),
                    brailleDotCount,
                  ),
                );
                judgeAnswer(false);
                setAfterJudgeAnswer(false);
              }}
            >
              次の問題へ
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setQuestion(makeQuestion(typeOfQuestions));
                setBrailleStrings(
                  new BrailleString(
                    "unicode",
                    [...Array(10)].map((_) => "⠀").join(""),
                    brailleDotCount,
                  ),
                );
                judgeAnswer(false);
                setAfterJudgeAnswer(false);
              }}
            >
              次の問題へ
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              judgeAnswer(
                brailleDotCount === 6
                  ? judge(brailleStrings, question)
                  : eightJudge(brailleStrings, question),
              );
              setAfterJudgeAnswer(true);
            }}
          >
            答え合わせ
          </Button>
        )}
      </Box>

      {afterJudgeAnswer === true ? (
        rightOrWrong === true ? (
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            正解
          </Typography>
        ) : (
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            不正解
          </Typography>
        )
      ) : null}
    </>
  );
}
